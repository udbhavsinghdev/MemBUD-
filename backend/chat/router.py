import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Conversation, Message, DocumentChunk, Document, Action
from backend.auth.utils import get_current_user
from backend.schemas import ChatMessageRequestSchema
from backend.ai.embeddings import get_text_embedding, cosine_similarity
from backend.ai.service import AIService

router = APIRouter(tags=["Chat"])

@router.post("/chat")
def chat_endpoint(
    req: ChatMessageRequestSchema, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # Find or create active conversation
    conv = None
    if req.conversation_id:
        conv = db.query(Conversation).filter(Conversation.id == req.conversation_id, Conversation.user_id == current_user.id).first()
    if not conv:
        conv = Conversation(
            user_id=current_user.id,
            title=req.question[:30] + "..." if len(req.question) > 30 else req.question
        )
        db.add(conv)
        db.commit()
        db.refresh(conv)

    # Save user message
    user_msg = Message(
        conversation_id=conv.id,
        role="user",
        content=req.question
    )
    db.add(user_msg)

    # Embed user question & retrieve top matching document chunks FOR CURRENT USER ONLY
    q_emb = get_text_embedding(req.question)
    chunks = db.query(DocumentChunk, Document.filename).join(Document, DocumentChunk.document_id == Document.id)\
               .filter(DocumentChunk.user_id == current_user.id).all()

    retrieved_chunks = []
    for chunk, filename in chunks:
        if chunk.embedding_json:
            c_emb = json.loads(chunk.embedding_json)
            sim = cosine_similarity(q_emb, c_emb)
            retrieved_chunks.append({
                "content": chunk.content,
                "doc_name": filename,
                "page": chunk.page_number,
                "score": sim
            })

    # Sort by similarity score top-5
    retrieved_chunks.sort(key=lambda x: x["score"], reverse=True)
    top_chunks = retrieved_chunks[:5]

    # Check for Action planning
    action_plan = AIService.plan_action(req.question)
    created_action = None
    if action_plan:
        created_action = Action(
            user_id=current_user.id,
            action_type=action_plan["type"],
            title=action_plan["title"],
            date=action_plan["date"],
            target=action_plan["target"],
            reason=action_plan["reason"],
            status="pending_confirmation"
        )
        db.add(created_action)

    # Generate Grounded AI Answer
    ai_res = AIService.generate_answer(req.question, top_chunks)

    # Save Assistant message
    ast_msg = Message(
        conversation_id=conv.id,
        role="assistant",
        content=ai_res["answer"],
        sources_json=json.dumps(ai_res["sources"]),
        conflict_json=json.dumps(ai_res["conflictData"]) if ai_res["hasConflict"] else None
    )
    db.add(ast_msg)
    db.commit()

    return {
        "conversation_id": conv.id,
        "message": {
            "id": ast_msg.id,
            "role": "assistant",
            "content": ai_res["answer"],
            "sources": ai_res["sources"],
            "hasConflict": ai_res["hasConflict"],
            "conflictData": ai_res.get("conflictData")
        },
        "actionRequired": {
            "id": created_action.id,
            "type": created_action.action_type,
            "title": created_action.title,
            "date": created_action.date,
            "target": created_action.target,
            "reason": created_action.reason,
            "status": created_action.status
        } if created_action else None
    }

@router.get("/conversations")
def list_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    convs = db.query(Conversation).filter(Conversation.user_id == current_user.id).order_by(Conversation.updated_at.desc()).all()
    return convs

@router.post("/conversations")
def create_conversation(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = Conversation(user_id=current_user.id, title="New Memory Chat")
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv

@router.delete("/conversations/{conv_id}")
def delete_conversation(conv_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = db.query(Conversation).filter(Conversation.id == conv_id, Conversation.user_id == current_user.id).first()
    if conv:
        db.delete(conv)
        db.commit()
    return {"message": "Conversation deleted"}

@router.get("/conversations/{conv_id}/messages")
def get_messages(conv_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    msgs = db.query(Message).filter(Message.conversation_id == conv_id).order_by(Message.created_at.asc()).all()
    res = []
    for m in msgs:
        res.append({
            "id": m.id,
            "role": m.role,
            "content": m.content,
            "sources": json.loads(m.sources_json) if m.sources_json else [],
            "hasConflict": bool(m.conflict_json),
            "conflictData": json.loads(m.conflict_json) if m.conflict_json else None
        })
    return res

import os
import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Document, DocumentChunk, Memory
from backend.auth.utils import get_current_user
from backend.config import UPLOAD_DIR
from backend.documents.processor import extract_text_from_file
from backend.ai.embeddings import get_text_embedding

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.get("")
def list_documents(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    docs = db.query(Document).filter(Document.user_id == current_user.id).order_by(Document.created_at.desc()).all()
    return docs

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    ext = file.filename.split('.')[-1].lower()
    if ext not in ["pdf", "docx", "txt", "png", "jpg", "jpeg"]:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    file_path = os.path.join(UPLOAD_DIR, f"{current_user.id}_{file.filename}")
    content_bytes = await file.read()
    with open(file_path, "wb") as f:
        f.write(content_bytes)

    # Extract text chunks
    extracted = extract_text_from_file(file_path, ext)
    full_content = "\n\n".join([c["content"] for c in extracted])

    doc = Document(
        user_id=current_user.id,
        filename=file.filename,
        file_type=ext,
        file_url=file_path,
        source_type="User Upload",
        processing_status="Ready",
        chunk_count=len(extracted),
        content=full_content
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Save chunks & embeddings
    for idx, item in enumerate(extracted):
        emb = get_text_embedding(item["content"])
        chunk = DocumentChunk(
            document_id=doc.id,
            user_id=current_user.id,
            content=item["content"],
            chunk_index=idx,
            page_number=item.get("page", 1),
            embedding_json=json.dumps(emb)
        )
        db.add(chunk)

    # Automatically create a summary Memory entry
    mem = Memory(
        user_id=current_user.id,
        title=f"Extracted Knowledge: {file.filename}",
        content=full_content[:300] + "..." if len(full_content) > 300 else full_content,
        memory_type="Document Summary",
        source_document_id=doc.id,
        source_name=doc.filename,
        page_number=1,
        importance="Medium"
    )
    db.add(mem)

    db.commit()
    return doc

@router.get("/{doc_id}")
def get_document(doc_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id, Document.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.delete("/{doc_id}")
def delete_document(doc_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id, Document.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(doc)
    db.commit()
    return {"message": "Document deleted"}

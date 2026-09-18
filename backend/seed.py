import os
import json
from sqlalchemy.orm import Session
from backend.database import engine, Base, SessionLocal
from backend.models import User, Document, DocumentChunk, Memory, Entity, Relationship, Conversation, Message
from backend.auth.utils import hash_password
from backend.ai.embeddings import get_text_embedding

def seed_demo_data():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if demo user exists
        user = db.query(User).filter(User.email == "udbhav@membud.ai").first()
        if not user:
            user = User(
                name="Udbhav Singh",
                email="udbhav@membud.ai",
                password_hash=hash_password("password123"),
                profile_picture="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
                timezone="Asia/Kolkata (GMT+5:30)",
                ai_response_style="Balanced"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # 1. Exam Schedule PDF
        doc1 = db.query(Document).filter(Document.user_id == user.id, Document.filename == "Exam_Schedule.pdf").first()
        if not doc1:
            doc1_content = "PHY175 CA - Physics Mechanics & Optics: 19 September 2026, 10:00 AM (Hall B3).\nMTH165 CA - Differential Equations: 22 September 2026, 02:00 PM."
            doc1 = Document(
                user_id=user.id,
                filename="Exam_Schedule.pdf",
                file_type="pdf",
                source_type="Official University Portal",
                processing_status="Ready",
                chunk_count=2,
                content=doc1_content
            )
            db.add(doc1)
            db.commit()
            db.refresh(doc1)

            chunk1 = DocumentChunk(
                document_id=doc1.id,
                user_id=user.id,
                content=doc1_content,
                chunk_index=0,
                page_number=2,
                embedding_json=json.dumps(get_text_embedding(doc1_content))
            )
            db.add(chunk1)

        # 2. Updated Schedule Image (Conflict)
        doc2 = db.query(Document).filter(Document.user_id == user.id, Document.filename == "Updated_Schedule.png").first()
        if not doc2:
            doc2_content = "[URGENT NOTICE] PHY175 CA is officially shifted to 20 September 2026 at 11:30 AM in Auditorium Main due to lab maintenance."
            doc2 = Document(
                user_id=user.id,
                filename="Updated_Schedule.png",
                file_type="image",
                source_type="WhatsApp Notice",
                processing_status="Ready",
                chunk_count=1,
                content=doc2_content
            )
            db.add(doc2)
            db.commit()
            db.refresh(doc2)

            chunk2 = DocumentChunk(
                document_id=doc2.id,
                user_id=user.id,
                content=doc2_content,
                chunk_index=0,
                page_number=1,
                embedding_json=json.dumps(get_text_embedding(doc2_content))
            )
            db.add(chunk2)

        # 3. Project Meeting Sync
        doc3 = db.query(Document).filter(Document.user_id == user.id, Document.filename == "Project_Meeting.pdf").first()
        if not doc3:
            doc3_content = "MemBUD Sync: Rahul suggested using FastAPI and Python 3.14 for backend API and ChromaDB for vector storage."
            doc3 = Document(
                user_id=user.id,
                filename="Project_Meeting.pdf",
                file_type="pdf",
                source_type="Meeting Minutes",
                processing_status="Ready",
                chunk_count=1,
                content=doc3_content
            )
            db.add(doc3)
            db.commit()
            db.refresh(doc3)

            chunk3 = DocumentChunk(
                document_id=doc3.id,
                user_id=user.id,
                content=doc3_content,
                chunk_index=0,
                page_number=1,
                embedding_json=json.dumps(get_text_embedding(doc3_content))
            )
            db.add(chunk3)

        # 4. Add Memories
        mem1 = db.query(Memory).filter(Memory.user_id == user.id, Memory.title == "PHY175 Exam Date (Schedule 1)").first()
        if not mem1:
            db.add(Memory(
                user_id=user.id,
                title="PHY175 Exam Date (Schedule 1)",
                content="PHY175 CA is scheduled on 19 September 2026 at 10:00 AM.",
                memory_type="Events",
                source_document_id=doc1.id,
                source_name=doc1.filename,
                page_number=2,
                importance="High",
                has_conflict=True,
                date_str="19 Sep 2026"
            ))

        mem2 = db.query(Memory).filter(Memory.user_id == user.id, Memory.title == "PHY175 Exam Rescheduled Date").first()
        if not mem2:
            db.add(Memory(
                user_id=user.id,
                title="PHY175 Exam Rescheduled Date",
                content="PHY175 CA shifted to 20 September 2026 at 11:30 AM in Auditorium Main.",
                memory_type="Events",
                source_document_id=doc2.id,
                source_name=doc2.filename,
                page_number=1,
                importance="High",
                has_conflict=True,
                date_str="20 Sep 2026"
            ))

        # 5. Add Entities
        ent1 = db.query(Entity).filter(Entity.user_id == user.id, Entity.name == "Rahul Sharma").first()
        if not ent1:
            db.add(Entity(user_id=user.id, name="Rahul Sharma", entity_type="person"))
            db.add(Entity(user_id=user.id, name="PHY175 CA", entity_type="event"))

        db.commit()
        print("[OK] Demo user and dataset successfully seeded!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_demo_data()

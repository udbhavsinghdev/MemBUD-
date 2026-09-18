from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Memory
from backend.auth.utils import get_current_user

router = APIRouter(prefix="/memories", tags=["Memories"])

@router.get("")
def get_memories(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    mems = db.query(Memory).filter(Memory.user_id == current_user.id).order_by(Memory.created_at.desc()).all()
    return mems

@router.get("/search")
def search_memories(q: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    q_lower = f"%{q.lower()}%"
    mems = db.query(Memory).filter(
        Memory.user_id == current_user.id,
        (Memory.title.ilike(q_lower) | Memory.content.ilike(q_lower))
    ).all()
    return mems

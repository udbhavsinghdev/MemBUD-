from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Entity
from backend.auth.utils import get_current_user

router = APIRouter(prefix="/people", tags=["People"])

@router.get("")
def get_people(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    people_entities = db.query(Entity).filter(Entity.user_id == current_user.id, Entity.entity_type == "person").all()
    res = []
    for p in people_entities:
        res.append({
            "id": p.id,
            "name": p.name,
            "role": "Teammate",
            "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
            "memories": ["Suggested backend choices", "Participated in project meeting"],
            "documents": ["Project_Meeting.pdf"]
        })
    return res

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Entity
from backend.auth.utils import get_current_user

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("")
def get_events(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    events_entities = db.query(Entity).filter(Entity.user_id == current_user.id, Entity.entity_type == "event").all()
    res = [
        {
            "id": "evt_01",
            "title": "PHY175 CA (Physics)",
            "date": "2026-09-19",
            "time": "10:00 AM",
            "location": "Hall B3 (Notice: Rescheduled to Auditorium Main)",
            "sourceDoc": "Exam_Schedule.pdf & Updated_Schedule.png",
            "hasConflict": True,
            "conflictNotice": "Conflicting dates: Sept 19 in Exam_Schedule.pdf vs Sept 20 in Updated_Schedule.png"
        },
        {
            "id": "evt_02",
            "title": "MTH165 CA (Mathematics)",
            "date": "2026-09-22",
            "time": "02:00 PM",
            "location": "Hall A1",
            "sourceDoc": "Exam_Schedule.pdf",
            "hasConflict": False
        },
        {
            "id": "evt_03",
            "title": "Google Internship OA Deadline",
            "date": "2026-09-25",
            "time": "11:59 PM IST",
            "location": "Online Portal",
            "sourceDoc": "Internship_Email.txt",
            "hasConflict": False
        }
    ]
    return res

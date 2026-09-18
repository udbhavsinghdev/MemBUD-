from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User
from backend.auth.utils import get_current_user

router = APIRouter(prefix="/relationships", tags=["Connections"])

@router.get("")
def get_relationships(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {
        "nodes": [
            { "id": "Rahul", "label": "Rahul Sharma", "type": "Person" },
            { "id": "FastAPI", "label": "FastAPI", "type": "Project" },
            { "id": "MemBUD", "label": "MemBUD Agent", "type": "Project" },
            { "id": "TeamMeeting", "label": "Team Sync (17 Sep)", "type": "Event" },
            { "id": "PHY175", "label": "PHY175 CA Exam", "type": "Event" },
            { "id": "Google", "label": "Google Internship", "type": "Topic" }
        ],
        "edges": [
            { "source": "Rahul", "target": "FastAPI", "label": "recommended" },
            { "source": "FastAPI", "target": "MemBUD", "label": "used for backend" },
            { "source": "Rahul", "target": "TeamMeeting", "label": "attended" },
            { "source": "TeamMeeting", "target": "MemBUD", "label": "discussed" },
            { "source": "MemBUD", "target": "PHY175", "label": "remembers date" },
            { "source": "MemBUD", "target": "Google", "label": "tracks deadline" }
        ]
    }

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Action, Entity
from backend.auth.utils import get_current_user
from backend.schemas import ActionConfirmRequestSchema

router = APIRouter(prefix="/actions", tags=["Actions"])

@router.post("/confirm")
def confirm_action(
    req: ActionConfirmRequestSchema, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    action = db.query(Action).filter(Action.id == req.action_id, Action.user_id == current_user.id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")

    if req.confirm:
        action.status = "completed"
        action.completed_at = datetime.utcnow()

        # Save to user calendar/events table
        evt = Entity(
            user_id=current_user.id,
            name=action.title,
            entity_type="event",
            metadata_json=f"Date: {action.date}"
        )
        db.add(evt)
        db.commit()
        return {"status": "success", "message": f"✓ Action confirmed. Created reminder for {action.date}."}
    else:
        action.status = "cancelled"
        db.commit()
        return {"status": "cancelled", "message": "Action cancelled by user."}

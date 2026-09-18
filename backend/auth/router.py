from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User
from backend.schemas import UserRegisterSchema, UserLoginSchema, UserProfileUpdateSchema, TokenResponseSchema, UserResponseSchema
from backend.auth.utils import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponseSchema)
def register(data: UserRegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    hashed = hash_password(data.password)
    user = User(
        name=data.name,
        email=data.email,
        password_hash=hashed
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/login", response_model=TokenResponseSchema)
def login(data: UserLoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=UserResponseSchema)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserResponseSchema)
def update_me(data: UserProfileUpdateSchema, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.name:
        current_user.name = data.name
    if data.email:
        current_user.email = data.email
    if data.timezone:
        current_user.timezone = data.timezone
    if data.ai_response_style:
        current_user.ai_response_style = data.ai_response_style

    db.commit()
    db.refresh(current_user)
    return current_user

@router.delete("/me")
def delete_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.delete(current_user)
    db.commit()
    return {"message": "Account deleted successfully"}

from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr

# Auth Schemas
class UserRegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    timezone: Optional[str] = None
    ai_response_style: Optional[str] = None

class UserResponseSchema(BaseModel):
    id: str
    name: str
    email: str
    profile_picture: str
    timezone: str
    ai_response_style: str
    created_at: Any

    class Config:
        from_attributes = True

class TokenResponseSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponseSchema

# Document Schemas
class DocumentResponseSchema(BaseModel):
    id: str
    filename: str
    file_type: str
    file_url: Optional[str] = None
    source_type: str
    processing_status: str
    chunk_count: int
    created_at: Any

    class Config:
        from_attributes = True

# Chat Schemas
class ChatMessageRequestSchema(BaseModel):
    conversation_id: Optional[str] = None
    question: str

class ActionConfirmRequestSchema(BaseModel):
    action_id: str
    confirm: bool

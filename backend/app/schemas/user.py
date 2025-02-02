from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str
    avatar_url: str
    oauth_id: str
    role_id: str

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

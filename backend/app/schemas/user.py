from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str
    avatar_url: str
    oauth_id: str
    role_id: str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class OperationRecordBase(BaseModel):
    ip_address: str
    operation_category: int
    filename: str
    time: datetime
    user_id: int

class OperationRecordCreate(OperationRecordBase):
    pass

class OperationRecordUpdate(OperationRecordBase):
    pass

class OperationRecord(OperationRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

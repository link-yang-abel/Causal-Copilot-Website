from sqlalchemy import Column, Integer, String, TIMESTAMP
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String)
    avatar_url = Column(String)
    oauth_id = Column(String, unique=True)
    role_id = Column(String)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

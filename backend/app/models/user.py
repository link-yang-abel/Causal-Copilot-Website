import sqlalchemy as sa
from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String)
    avatar_url = Column(String)
    oauth_id = Column(String, unique=True)
    role_id = Column(String)
    created_at = Column(TIMESTAMP, server_default=sa.func.now())
    updated_at = Column(TIMESTAMP, server_default=sa.func.now())

    operation_records = relationship("OperationRecord", back_populates="user")


class OperationRecord(Base):
    __tablename__ = "user_operation_records"

    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String)
    operation_category = Column(sa.SmallInteger, nullable=False)
    filename = Column(String)
    time = Column(TIMESTAMP)
    user_id = Column(Integer, sa.ForeignKey('users.id'))
    created_at = Column(TIMESTAMP, server_default=sa.func.now())
    updated_at = Column(TIMESTAMP, server_default=sa.func.now())

    user = relationship("User", back_populates="operation_records")

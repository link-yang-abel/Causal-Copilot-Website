from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id:int):
    return db.query(User).filter(User.id==user_id).first()

def get_user_by_oauth(db: Session, oauth_id: str):
    return db.query(User).filter(User.oauth_id==oauth_id).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.email,
        name=user.name,
        avatar_url=user.avatar_url,
        oauth_id=user.oauth_id,
        role_id = user.role_id,
    )
    # db_user = User(**user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = get_user(db, user_id)
    if db_user:
        db_user.email=user.email,
        db_user.name=user.name,
        db_user.avatar_url=user.avatar_url,
        db_user.oauth_id=user.oauth_id,
        db_user.role_id = user.role_id,
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

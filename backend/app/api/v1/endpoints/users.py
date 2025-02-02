from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.crud.user import get_users
from app.schemas.user import User

router = APIRouter()

@router.get('/users/')
def get_userss():
    users = {'msg': 'ok'}
    return users

@router.get('/allusers/', response_model=list[User])
def get_users_view(db: Session = Depends(get_db)):
    users = get_users(db=db)
    return users

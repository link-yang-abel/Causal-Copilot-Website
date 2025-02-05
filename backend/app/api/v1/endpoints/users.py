from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.crud import user as user_crud
from app.schemas import user as user_schemas

router = APIRouter()

@router.get('/test/')
def test():
    users = {'msg': 'ok'}
    return users

@router.get('/users/', response_model=list[user_schemas.User])
def get_users(skip: int=0, limit: int=100, db: Session = Depends(get_db)):
    users = user_crud.get_users(db, skip, limit)
    return users

@router.get('/users/{user_id}', response_model=user_schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    return db_user

@router.post("/users/", response_model=user_schemas.User)
def create_user(user: user_schemas.UserCreate, db: Session=Depends(get_db)):
    db_user = user_crud.get_user_by_oauth(db, user.oauth_id)
    if db_user:
        raise HTTPException(status_code=400, detail="User oauth already recorded.")
    return user_crud.create_user(db, user)

@router.put("/users/{user_id}", response_model=user_schemas.User)
def update_user(user_id: int, user: user_schemas.UserUpdate, db: Session=Depends(get_db)):
    db_user = user_crud.update_user(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    return db_user

@router.delete("/users/{user_id}", response_model=user_schemas.User)
def delete_user(user_id: int, db: Session=Depends(get_db)):
    db_user = user_crud.delete_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    return db_user




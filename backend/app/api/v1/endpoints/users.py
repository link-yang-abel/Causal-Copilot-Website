from fastapi import APIRouter

router = APIRouter()

@router.get('/users/')
def get_users():
    users = {'msg': 'ok'}
    return users

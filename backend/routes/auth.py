from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.user import UserService, UserCreate, UserLogin, UserResponse
from auth import create_access_token, get_current_user_id
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["authentication"])

async def get_user_service(db: AsyncIOMotorDatabase = Depends(lambda: None)) -> UserService:
    # This will be injected in the main server file
    return UserService(db)

@router.post("/register", response_model=dict)
async def register(user_data: UserCreate, user_service: UserService = Depends(get_user_service)):
    try:
        user = await user_service.create_user(user_data)
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user.id}, expires_delta=access_token_expires
        )
        
        user_response = UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            role=user.role,
            created_at=user.created_at
        )
        
        return {
            "user": user_response.dict(),
            "token": access_token,
            "message": "User registered successfully"
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=dict)
async def login(login_data: UserLogin, user_service: UserService = Depends(get_user_service)):
    user = await user_service.authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    user_response = UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        created_at=user.created_at
    )
    
    return {
        "user": user_response.dict(),
        "token": access_token,
        "message": "Logged in successfully"
    }

@router.post("/logout", response_model=dict)
async def logout(current_user_id: str = Depends(get_current_user_id)):
    # In a real implementation, you might want to blacklist the token
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    current_user_id: str = Depends(get_current_user_id),
    user_service: UserService = Depends(get_user_service)
):
    user = await user_service.get_user_by_id(current_user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        created_at=user.created_at
    )
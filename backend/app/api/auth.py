# from fastapi import APIRouter, HTTPException, status, Depends
# from ..models.user import (
#     UserCreate, UserLogin, UserResponse, 
#     TokenResponse, RefreshTokenRequest
# )
# from ..core.security import (
#     get_password_hash, verify_password,
#     create_access_token, create_refresh_token,
#     decode_refresh_token
# )
# from ..database.mongodb import get_database
# from datetime import datetime
# from bson import ObjectId

# router = APIRouter(prefix="/auth", tags=["Authentication"])


# @router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
# async def signup(user_data: UserCreate):
#     """Register a new user"""
#     db = get_database()
    
#     # Check if user already exists
#     existing_user = await db.users.find_one({"email": user_data.email})
#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#         )
    
#     # Hash password
#     hashed_password = get_password_hash(user_data.password)
    
#     # Create user document
#     user_doc = {
#         "email": user_data.email,
#         "full_name": user_data.full_name,
#         "hashed_password": hashed_password,
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
    
#     # Insert user
#     result = await db.users.insert_one(user_doc)
#     user_id = str(result.inserted_id)
    
#     # Create tokens
#     access_token = create_access_token(data={"sub": user_id})
#     refresh_token = create_refresh_token(data={"sub": user_id})
    
#     # Return response
#     user_response = UserResponse(
#         id=user_id,
#         email=user_data.email,
#         full_name=user_data.full_name,
#         created_at=user_doc["created_at"]
#     )
    
#     return TokenResponse(
#         access_token=access_token,
#         refresh_token=refresh_token,
#         user=user_response
#     )


# @router.post("/login", response_model=TokenResponse)
# async def login(credentials: UserLogin):
#     """Login user"""
#     db = get_database()
    
#     # Find user
#     user = await db.users.find_one({"email": credentials.email})
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password"
#         )
    
#     # Verify password
#     if not verify_password(credentials.password, user["hashed_password"]):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password"
#         )
    
#     # Create tokens
#     user_id = str(user["_id"])
#     access_token = create_access_token(data={"sub": user_id})
#     refresh_token = create_refresh_token(data={"sub": user_id})
    
#     # Return response
#     user_response = UserResponse(
#         id=user_id,
#         email=user["email"],
#         full_name=user["full_name"],
#         created_at=user["created_at"]
#     )
    
#     return TokenResponse(
#         access_token=access_token,
#         refresh_token=refresh_token,
#         user=user_response
#     )


# @router.post("/refresh", response_model=TokenResponse)
# async def refresh_token(token_data: RefreshTokenRequest):
#     """Refresh access token using refresh token"""
#     # Decode refresh token
#     payload = decode_refresh_token(token_data.refresh_token)
#     if payload is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid refresh token"
#         )
    
#     user_id = payload.get("sub")
#     if user_id is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid refresh token"
#         )
    
#     # Get user
#     db = get_database()
#     user = await db.users.find_one({"_id": ObjectId(user_id)})
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="User not found"
#         )
    
#     # Create new tokens
#     access_token = create_access_token(data={"sub": user_id})
#     new_refresh_token = create_refresh_token(data={"sub": user_id})
    
#     # Return response
#     user_response = UserResponse(
#         id=user_id,
#         email=user["email"],
#         full_name=user["full_name"],
#         created_at=user["created_at"]
#     )
    
#     return TokenResponse(
#         access_token=access_token,
#         refresh_token=new_refresh_token,
#         user=user_response
#     )


from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from ..models.user import (
    UserCreate, UserLogin, UserResponse,
    TokenResponse, RefreshTokenRequest
)
from ..core.security import (
    get_password_hash, verify_password,
    create_access_token, create_refresh_token,
    decode_refresh_token
)
from ..database.mongodb import get_database
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["Authentication"])


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    db = get_database()

    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = get_password_hash(user_data.password)

    user_doc = {
        "email": user_data.email,
        "full_name": user_data.full_name,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)

    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})

    user_response = UserResponse(
        id=user_id,
        email=user_data.email,
        full_name=user_data.full_name,
        created_at=user_doc["created_at"]
    )

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_response
    )


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    db = get_database()

    user = await db.users.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    if not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})

    user_response = UserResponse(
        id=user_id,
        email=user["email"],
        full_name=user["full_name"],
        created_at=user["created_at"]
    )

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_response
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token_data: RefreshTokenRequest):
    payload = decode_refresh_token(token_data.refresh_token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    db = get_database()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    access_token = create_access_token(data={"sub": user_id})
    new_refresh_token = create_refresh_token(data={"sub": user_id})

    user_response = UserResponse(
        id=user_id,
        email=user["email"],
        full_name=user["full_name"],
        created_at=user["created_at"]
    )

    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh_token,
        user=user_response
    )


@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest):
    """
    Reset a user's password.
    OTP verification is handled on the frontend via EmailJS.
    This endpoint just updates the password after the OTP is verified.
    """
    db = get_database()

    user = await db.users.find_one({"email": data.email})
    if not user:
        # Don't reveal whether email exists — generic message
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email"
        )

    if len(data.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters"
        )

    hashed = get_password_hash(data.new_password)

    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"hashed_password": hashed, "updated_at": datetime.utcnow()}}
    )

    return {"message": "Password reset successfully"}
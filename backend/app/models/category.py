from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryInDB(CategoryBase):
    id: str = Field(alias="_id")
    user_id: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class CategoryResponse(CategoryBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class SizeBase(BaseModel):
    name: str


class SizeCreate(SizeBase):
    pass


class SizeInDB(SizeBase):
    id: str = Field(alias="_id")
    user_id: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class SizeResponse(SizeBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

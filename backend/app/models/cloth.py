from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId


class ClothMeter(BaseModel):
    """Represents a cloth item with a meter quantity (not a size)."""
    item: str        # label chosen by user, e.g. "Main Fabric", "Lining"
    meters: float = 0.0


class ClothBase(BaseModel):
    name: str
    images: List[str] = []
    items: List[ClothMeter] = []


class ClothCreate(ClothBase):
    product_id: str   # reference back to the originating product


class ClothUpdate(BaseModel):
    items: Optional[List[ClothMeter]] = None
    images: Optional[List[str]] = None


class ClothInDB(ClothBase):
    id: str = Field(alias="_id")
    user_id: str
    product_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ClothResponse(ClothBase):
    id: str
    user_id: str
    product_id: str
    total_meters: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
# from pydantic import BaseModel, Field
# from typing import List, Optional
# from datetime import datetime
# from bson import ObjectId
# from .product import SizeInventory


# class ProductionBase(BaseModel):
#     name: str
#     category: str
#     images: List[str] = []
#     sizes: List[SizeInventory] = []


# class ProductionCreate(ProductionBase):
#     pass


# class ProductionUpdate(BaseModel):
#     name: Optional[str] = None
#     category: Optional[str] = None
#     images: Optional[List[str]] = None
#     sizes: Optional[List[SizeInventory]] = None


# class ProductionInDB(ProductionBase):
#     id: str = Field(alias="_id")
#     user_id: str
#     created_at: datetime
#     updated_at: datetime
    
#     class Config:
#         populate_by_name = True
#         json_encoders = {ObjectId: str}


# class ProductionResponse(ProductionBase):
#     id: str
#     user_id: str
#     total_inventory: int
#     created_at: datetime
#     updated_at: datetime
    
#     class Config:
#         from_attributes = True


from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from .product import SizeInventory


class ProductionBase(BaseModel):
    name: str
    category: str
    images: List[str] = []
    sizes: List[SizeInventory] = []


class ProductionCreate(ProductionBase):
    product_id: Optional[str] = None   # set when auto-created from a product


class ProductionUpdate(BaseModel):
    # Users can only update sizes and images in production
    sizes: Optional[List[SizeInventory]] = None
    images: Optional[List[str]] = None
    # name/category intentionally excluded


class ProductionInDB(ProductionBase):
    id: str = Field(alias="_id")
    user_id: str
    product_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ProductionResponse(ProductionBase):
    id: str
    user_id: str
    product_id: Optional[str] = None
    total_inventory: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
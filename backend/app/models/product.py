from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from bson import ObjectId


class SizeInventory(BaseModel):
    size: str
    quantity: int = 0


class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    images: List[str] = []
    sizes: List[SizeInventory] = []


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    images: Optional[List[str]] = None
    sizes: Optional[List[SizeInventory]] = None


class ProductInDB(ProductBase):
    id: str = Field(alias="_id")
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ProductResponse(ProductBase):
    id: str
    user_id: str
    total_inventory: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class InventoryUpdate(BaseModel):
    size: str
    quantity: int


from pydantic import BaseModel
from typing import List


class InventoryAdjustmentRequest(BaseModel):
    size: str
    quantity: int
    operation: str


class TransferToProductionRequest(BaseModel):
    product_id: str


class BulkTransferRequest(BaseModel):
    product_ids: List[str]
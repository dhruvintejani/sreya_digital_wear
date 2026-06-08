from fastapi import APIRouter, HTTPException, status, Depends
from ..models.cloth import ClothCreate, ClothUpdate, ClothResponse
from ..middleware.auth import get_current_user
from ..database.mongodb import get_database
from datetime import datetime
from bson import ObjectId
from typing import List, Optional

router = APIRouter(prefix="/cloths", tags=["Cloths"])


def cloth_response(cloth: dict) -> ClothResponse:
    total_meters = sum(item["meters"] for item in cloth.get("items", []))
    return ClothResponse(
        id=str(cloth["_id"]),
        user_id=str(cloth["user_id"]),
        product_id=str(cloth["product_id"]),
        name=cloth["name"],
        images=cloth.get("images", []),
        items=cloth.get("items", []),
        total_meters=total_meters,
        created_at=cloth["created_at"],
        updated_at=cloth["updated_at"],
    )


@router.get("/", response_model=List[ClothResponse])
async def list_cloths(
    search: Optional[str] = None,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    query: dict = {"user_id": ObjectId(current_user["_id"])}
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    cursor = db.cloths.find(query).sort("created_at", -1)
    docs = await cursor.to_list(length=1000)
    return [cloth_response(d) for d in docs]


@router.get("/{cloth_id}", response_model=ClothResponse)
async def get_cloth(
    cloth_id: str,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    if not ObjectId.is_valid(cloth_id):
        raise HTTPException(status_code=400, detail="Invalid cloth ID")
    doc = await db.cloths.find_one({
        "_id": ObjectId(cloth_id),
        "user_id": ObjectId(current_user["_id"]),
    })
    if not doc:
        raise HTTPException(status_code=404, detail="Cloth not found")
    return cloth_response(doc)


@router.post("/", response_model=ClothResponse, status_code=status.HTTP_201_CREATED)
async def create_cloth(
    data: ClothCreate,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    doc = {
        "user_id": ObjectId(current_user["_id"]),
        "product_id": ObjectId(data.product_id),
        "name": data.name,
        "images": data.images,
        "items": [i.dict() for i in data.items],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    result = await db.cloths.insert_one(doc)
    doc["_id"] = result.inserted_id
    return cloth_response(doc)


@router.put("/{cloth_id}", response_model=ClothResponse)
async def update_cloth(
    cloth_id: str,
    data: ClothUpdate,
    current_user: dict = Depends(get_current_user),
):
    db = get_database()
    if not ObjectId.is_valid(cloth_id):
        raise HTTPException(status_code=400, detail="Invalid cloth ID")

    update: dict = {"updated_at": datetime.utcnow()}
    if data.items is not None:
        update["items"] = [i.dict() for i in data.items]
    if data.images is not None:
        update["images"] = data.images

    result = await db.cloths.find_one_and_update(
        {"_id": ObjectId(cloth_id), "user_id": ObjectId(current_user["_id"])},
        {"$set": update},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Cloth not found")
    return cloth_response(result)


@router.delete("/{cloth_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cloth(
    cloth_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Internal use — called when a product is deleted."""
    db = get_database()
    if not ObjectId.is_valid(cloth_id):
        raise HTTPException(status_code=400, detail="Invalid cloth ID")
    await db.cloths.delete_one({
        "_id": ObjectId(cloth_id),
        "user_id": ObjectId(current_user["_id"]),
    })


@router.delete("/by-product/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cloth_by_product(
    product_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete cloth entry linked to a product (called on product deletion)."""
    db = get_database()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    await db.cloths.delete_many({
        "product_id": ObjectId(product_id),
        "user_id": ObjectId(current_user["_id"]),
    })
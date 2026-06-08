# from fastapi import APIRouter, HTTPException, status, Depends
# from ..models.category import (
#     CategoryCreate, CategoryResponse,
#     SizeCreate, SizeResponse
# )
# from ..middleware.auth import get_current_user
# from ..database.mongodb import get_database
# from datetime import datetime
# from bson import ObjectId
# from typing import List

# router = APIRouter(prefix="/categories", tags=["Categories & Sizes"])


# # Default categories
# DEFAULT_CATEGORIES = [
#     "Saree", "Kurti", "Gown", "Lehenga", "Dress", "Blouse",
#     "Dupatta", "Salwar Suit", "Co-Ord Set", "Palazzo", "Sharara",
#     "Anarkali", "Night Wear", "Kids Wear"
# ]

# # Default sizes
# DEFAULT_SIZES = [
#     "XS", "S", "M", "L", "XL", "XXL", "XXXL",
#     "28", "30", "32", "34", "36", "38", "40", "42", "44"
# ]


# @router.get("/", response_model=List[CategoryResponse])
# async def get_categories(
#     current_user: dict = Depends(get_current_user)
# ):
#     """Get all categories including defaults and user-created ones"""
#     db = get_database()
    
#     # Get user-created categories
#     cursor = db.categories.find({"user_id": ObjectId(current_user["_id"])})
#     user_categories = await cursor.to_list(length=1000)
    
#     # Convert to response format
#     categories = []
    
#     # Add default categories
#     for i, name in enumerate(DEFAULT_CATEGORIES):
#         categories.append(CategoryResponse(
#             id=f"default_{i}",
#             name=name,
#             created_at=datetime.utcnow()
#         ))
    
#     # Add user categories
#     for cat in user_categories:
#         categories.append(CategoryResponse(
#             id=str(cat["_id"]),
#             name=cat["name"],
#             created_at=cat["created_at"]
#         ))
    
#     return categories


# @router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
# async def create_category(
#     category_data: CategoryCreate,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Create a new category"""
#     db = get_database()
    
#     # Check if category already exists for this user
#     existing = await db.categories.find_one({
#         "user_id": ObjectId(current_user["_id"]),
#         "name": category_data.name
#     })
    
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Category already exists"
#         )
    
#     # Create category
#     category_doc = {
#         "user_id": ObjectId(current_user["_id"]),
#         "name": category_data.name,
#         "created_at": datetime.utcnow()
#     }
    
#     result = await db.categories.insert_one(category_doc)
    
#     return CategoryResponse(
#         id=str(result.inserted_id),
#         name=category_data.name,
#         created_at=category_doc["created_at"]
#     )


# @router.get("/sizes", response_model=List[SizeResponse])
# async def get_sizes(
#     current_user: dict = Depends(get_current_user)
# ):
#     """Get all sizes including defaults and user-created ones"""
#     db = get_database()
    
#     # Get user-created sizes
#     cursor = db.sizes.find({"user_id": ObjectId(current_user["_id"])})
#     user_sizes = await cursor.to_list(length=1000)
    
#     # Convert to response format
#     sizes = []
    
#     # Add default sizes
#     for i, name in enumerate(DEFAULT_SIZES):
#         sizes.append(SizeResponse(
#             id=f"default_{i}",
#             name=name,
#             created_at=datetime.utcnow()
#         ))
    
#     # Add user sizes
#     for size in user_sizes:
#         sizes.append(SizeResponse(
#             id=str(size["_id"]),
#             name=size["name"],
#             created_at=size["created_at"]
#         ))
    
#     return sizes


# @router.post("/sizes", response_model=SizeResponse, status_code=status.HTTP_201_CREATED)
# async def create_size(
#     size_data: SizeCreate,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Create a new size"""
#     db = get_database()
    
#     # Check if size already exists for this user
#     existing = await db.sizes.find_one({
#         "user_id": ObjectId(current_user["_id"]),
#         "name": size_data.name
#     })
    
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Size already exists"
#         )
    
#     # Create size
#     size_doc = {
#         "user_id": ObjectId(current_user["_id"]),
#         "name": size_data.name,
#         "created_at": datetime.utcnow()
#     }
    
#     result = await db.sizes.insert_one(size_doc)
    
#     return SizeResponse(
#         id=str(result.inserted_id),
#         name=size_data.name,
#         created_at=size_doc["created_at"]
#     )
    


from fastapi import APIRouter, HTTPException, status, Depends
from ..models.category import (
    CategoryCreate,
    CategoryResponse,
    SizeCreate,
    SizeResponse
)
from ..middleware.auth import get_current_user
from ..database.mongodb import get_database
from datetime import datetime
from bson import ObjectId
from typing import List

router = APIRouter(
    prefix="/categories",
    tags=["Categories & Sizes"]
)

DEFAULT_CATEGORIES = [
    "Saree",
    "Kurti",
    "Gown",
    "Lehenga",
    "Dress",
    "Blouse",
    "Dupatta",
    "Salwar Suit",
    "Co-Ord Set",
    "Palazzo",
    "Sharara",
    "Anarkali",
    "Night Wear",
    "Kids Wear"
]

DEFAULT_SIZES = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44"
]


# ==========================
# CATEGORIES
# ==========================

@router.get("/", response_model=List[CategoryResponse])
async def get_categories(
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    cursor = db.categories.find(
        {"user_id": ObjectId(current_user["_id"])}
    )

    user_categories = await cursor.to_list(length=1000)

    categories = []

    for index, name in enumerate(DEFAULT_CATEGORIES):
        categories.append(
            CategoryResponse(
                id=f"default_{index}",
                name=name,
                created_at=datetime.utcnow()
            )
        )

    for category in user_categories:
        categories.append(
            CategoryResponse(
                id=str(category["_id"]),
                name=category["name"],
                created_at=category["created_at"]
            )
        )

    return categories


@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_category(
    category_data: CategoryCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    category_name = category_data.name.strip()

    existing = await db.categories.find_one({
        "user_id": ObjectId(current_user["_id"]),
        "name": {
            "$regex": f"^{category_name}$",
            "$options": "i"
        }
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    category_doc = {
        "user_id": ObjectId(current_user["_id"]),
        "name": category_name,
        "created_at": datetime.utcnow()
    }

    result = await db.categories.insert_one(category_doc)

    return CategoryResponse(
        id=str(result.inserted_id),
        name=category_name,
        created_at=category_doc["created_at"]
    )


@router.put("/{category_id}")
async def update_category(
    category_id: str,
    category_data: CategoryCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    if category_id.startswith("default_"):
        raise HTTPException(
            status_code=400,
            detail="Default categories cannot be edited"
        )

    if not ObjectId.is_valid(category_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid category id"
        )

    new_name = category_data.name.strip()

    duplicate = await db.categories.find_one({
        "user_id": ObjectId(current_user["_id"]),
        "name": {
            "$regex": f"^{new_name}$",
            "$options": "i"
        },
        "_id": {"$ne": ObjectId(category_id)}
    })

    if duplicate:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    result = await db.categories.update_one(
        {
            "_id": ObjectId(category_id),
            "user_id": ObjectId(current_user["_id"])
        },
        {
            "$set": {
                "name": new_name
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    await db.products.update_many(
        {
            "user_id": ObjectId(current_user["_id"]),
            "category": {"$exists": True}
        },
        [
            {
                "$set": {
                    "category": {
                        "$cond": [
                            {"$eq": ["$category", category_data.name]},
                            new_name,
                            "$category"
                        ]
                    }
                }
            }
        ]
    )

    await db.production.update_many(
        {
            "user_id": ObjectId(current_user["_id"]),
            "category": {"$exists": True}
        },
        [
            {
                "$set": {
                    "category": {
                        "$cond": [
                            {"$eq": ["$category", category_data.name]},
                            new_name,
                            "$category"
                        ]
                    }
                }
            }
        ]
    )

    return {"message": "Category updated successfully"}


# ==========================
# SIZES
# ==========================

@router.get("/sizes", response_model=List[SizeResponse])
async def get_sizes(
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    cursor = db.sizes.find(
        {"user_id": ObjectId(current_user["_id"])}
    )

    user_sizes = await cursor.to_list(length=1000)

    sizes = []

    for index, name in enumerate(DEFAULT_SIZES):
        sizes.append(
            SizeResponse(
                id=f"default_{index}",
                name=name,
                created_at=datetime.utcnow()
            )
        )

    for size in user_sizes:
        sizes.append(
            SizeResponse(
                id=str(size["_id"]),
                name=size["name"],
                created_at=size["created_at"]
            )
        )

    return sizes


@router.post(
    "/sizes",
    response_model=SizeResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_size(
    size_data: SizeCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    size_name = size_data.name.strip()

    existing = await db.sizes.find_one({
        "user_id": ObjectId(current_user["_id"]),
        "name": {
            "$regex": f"^{size_name}$",
            "$options": "i"
        }
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Size already exists"
        )

    size_doc = {
        "user_id": ObjectId(current_user["_id"]),
        "name": size_name,
        "created_at": datetime.utcnow()
    }

    result = await db.sizes.insert_one(size_doc)

    return SizeResponse(
        id=str(result.inserted_id),
        name=size_name,
        created_at=size_doc["created_at"]
    )


@router.put("/sizes/{size_id}")
async def update_size(
    size_id: str,
    size_data: SizeCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    if size_id.startswith("default_"):
        raise HTTPException(
            status_code=400,
            detail="Default sizes cannot be edited"
        )

    if not ObjectId.is_valid(size_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid size id"
        )

    new_name = size_data.name.strip()

    duplicate = await db.sizes.find_one({
        "user_id": ObjectId(current_user["_id"]),
        "name": {
            "$regex": f"^{new_name}$",
            "$options": "i"
        },
        "_id": {"$ne": ObjectId(size_id)}
    })

    if duplicate:
        raise HTTPException(
            status_code=400,
            detail="Size already exists"
        )

    result = await db.sizes.update_one(
        {
            "_id": ObjectId(size_id),
            "user_id": ObjectId(current_user["_id"])
        },
        {
            "$set": {
                "name": new_name
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Size not found"
        )

    return {"message": "Size updated successfully"}
# from fastapi import APIRouter, HTTPException, status, Depends
# from ..models.product import (
#     ProductCreate, ProductUpdate, ProductResponse, 
#     InventoryUpdate, SizeInventory
# )
# from ..middleware.auth import get_current_user
# from ..database.mongodb import get_database
# from datetime import datetime
# from bson import ObjectId
# from typing import List, Optional

# router = APIRouter(prefix="/products", tags=["Products"])


# def calculate_total_inventory(sizes: List[SizeInventory]) -> int:
#     """Calculate total inventory from all sizes"""
#     return sum(size.quantity for size in sizes)


# def product_response(product: dict) -> ProductResponse:
#     """Convert product document to response"""
#     total_inventory = sum(size["quantity"] for size in product.get("sizes", []))
    
#     return ProductResponse(
#         id=str(product["_id"]),
#         user_id=str(product["user_id"]),
#         name=product["name"],
#         category=product["category"],
#         price=product["price"],
#         images=product.get("images", []),
#         sizes=[SizeInventory(**size) for size in product.get("sizes", [])],
#         total_inventory=total_inventory,
#         created_at=product["created_at"],
#         updated_at=product["updated_at"]
#     )


# @router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
# async def create_product(
#     product_data: ProductCreate,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Create a new product"""
#     db = get_database()
    
#     product_doc = {
#         "user_id": ObjectId(current_user["_id"]),
#         "name": product_data.name,
#         "category": product_data.category,
#         "price": product_data.price,
#         "images": product_data.images,
#         "sizes": [size.dict() for size in product_data.sizes],
#         "created_at": datetime.utcnow(),
#         "updated_at": datetime.utcnow()
#     }
    
#     result = await db.products.insert_one(product_doc)
#     product_doc["_id"] = result.inserted_id
    
#     return product_response(product_doc)


# @router.get("/", response_model=List[ProductResponse])
# async def get_products(
#     category: Optional[str] = None,
#     search: Optional[str] = None,
#     low_stock: Optional[bool] = None,
#     out_of_stock: Optional[bool] = None,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Get all products for current user"""
#     db = get_database()
    
#     # Build query
#     query = {"user_id": ObjectId(current_user["_id"])}
    
#     if category:
#         query["category"] = category
    
#     if search:
#         query["name"] = {"$regex": search, "$options": "i"}
    
#     # Get products
#     cursor = db.products.find(query).sort("created_at", -1)
#     products = await cursor.to_list(length=1000)
    
#     # Filter by stock status if needed
#     if low_stock or out_of_stock:
#         filtered_products = []
#         for product in products:
#             sizes = product.get("sizes", [])
            
#             if out_of_stock:
#                 # Check if any size is 0
#                 has_zero = any(size["quantity"] == 0 for size in sizes)
#                 if has_zero:
#                     filtered_products.append(product)
#             elif low_stock:
#                 # Check if any size is <= 5 and > 0
#                 has_low = any(0 < size["quantity"] <= 5 for size in sizes)
#                 if has_low:
#                     filtered_products.append(product)
        
#         products = filtered_products
    
#     return [product_response(product) for product in products]


# @router.get("/{product_id}", response_model=ProductResponse)
# async def get_product(
#     product_id: str,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Get a single product by ID"""
#     db = get_database()
    
#     if not ObjectId.is_valid(product_id):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid product ID"
#         )
    
#     product = await db.products.find_one({
#         "_id": ObjectId(product_id),
#         "user_id": ObjectId(current_user["_id"])
#     })
    
#     if not product:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Product not found"
#         )
    
#     return product_response(product)


# @router.put("/{product_id}", response_model=ProductResponse)
# async def update_product(
#     product_id: str,
#     product_data: ProductUpdate,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Update a product"""
#     db = get_database()
    
#     if not ObjectId.is_valid(product_id):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid product ID"
#         )
    
#     # Build update data
#     update_data = {
#         "updated_at": datetime.utcnow()
#     }
    
#     if product_data.name is not None:
#         update_data["name"] = product_data.name
#     if product_data.category is not None:
#         update_data["category"] = product_data.category
#     if product_data.price is not None:
#         update_data["price"] = product_data.price
#     if product_data.images is not None:
#         update_data["images"] = product_data.images
#     if product_data.sizes is not None:
#         update_data["sizes"] = [size.dict() for size in product_data.sizes]

#     # Update product
#     result = await db.products.find_one_and_update(
#         {
#             "_id": ObjectId(product_id),
#             "user_id": ObjectId(current_user["_id"])
#         },
#         {"$set": update_data},
#         return_document=True
#     )
    
#     if not result:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Product not found"
#         )
    
#     return product_response(result)


# @router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_product(
#     product_id: str,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Delete a product"""
#     db = get_database()
    
#     if not ObjectId.is_valid(product_id):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid product ID"
#         )
    
#     result = await db.products.delete_one({
#         "_id": ObjectId(product_id),
#         "user_id": ObjectId(current_user["_id"])
#     })
    
#     if result.deleted_count == 0:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Product not found"
#         )
    
#     return None


# @router.get("/stats/dashboard")
# async def get_dashboard_stats(
#     current_user: dict = Depends(get_current_user)
# ):
#     """Get dashboard statistics"""
#     db = get_database()
    
#     # Get all products
#     cursor = db.products.find({"user_id": ObjectId(current_user["_id"])})
#     products = await cursor.to_list(length=1000)
    
#     total_products = len(products)
#     total_inventory = 0
#     low_stock_count = 0
#     out_of_stock_count = 0
    
#     for product in products:
#         sizes = product.get("sizes", [])
        
#         # Calculate total inventory
#         product_total = sum(size["quantity"] for size in sizes)
#         total_inventory += product_total
        
#         # Check low stock (any size <= 5 and > 0)
#         has_low = any(0 < size["quantity"] <= 5 for size in sizes)
#         if has_low:
#             low_stock_count += 1
        
#         # Check out of stock (any size = 0)
#         has_zero = any(size["quantity"] == 0 for size in sizes)
#         if has_zero:
#             out_of_stock_count += 1
    
#     return {
#         "total_products": total_products,
#         "total_inventory": total_inventory,
#         "low_stock": low_stock_count,
#         "out_of_stock": out_of_stock_count
#     }


from fastapi import APIRouter, HTTPException, status, Depends
from ..models.product import (
    ProductCreate, ProductUpdate, ProductResponse,
    InventoryUpdate, SizeInventory
)
from ..middleware.auth import get_current_user
from ..database.mongodb import get_database
from datetime import datetime
from bson import ObjectId
from typing import List, Optional

router = APIRouter(prefix="/products", tags=["Products"])


def product_response(product: dict) -> ProductResponse:
    total_inventory = sum(size["quantity"] for size in product.get("sizes", []))
    return ProductResponse(
        id=str(product["_id"]),
        user_id=str(product["user_id"]),
        name=product["name"],
        category=product["category"],
        price=product["price"],
        images=product.get("images", []),
        sizes=[SizeInventory(**size) for size in product.get("sizes", [])],
        total_inventory=total_inventory,
        created_at=product["created_at"],
        updated_at=product["updated_at"]
    )


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    product_doc = {
        "user_id": ObjectId(current_user["_id"]),
        "name": product_data.name,
        "category": product_data.category,
        "price": product_data.price,
        "images": product_data.images,
        "sizes": [size.dict() for size in product_data.sizes],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    result = await db.products.insert_one(product_doc)
    product_doc["_id"] = result.inserted_id
    product_id = result.inserted_id

    # ── Auto-create production entry (sizes with 0 quantity) ─────────────────
    production_doc = {
        "user_id": ObjectId(current_user["_id"]),
        "product_id": product_id,
        "name": product_data.name,
        "category": product_data.category,
        "images": product_data.images,
        "sizes": [{"size": s.size, "quantity": 0} for s in product_data.sizes],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    await db.production.insert_one(production_doc)

    # ── Auto-create cloth entry (empty items list, user fills meters) ─────────
    cloth_doc = {
        "user_id": ObjectId(current_user["_id"]),
        "product_id": product_id,
        "name": product_data.name,
        "images": product_data.images,
        "items": [],           # user will add meter-based items themselves
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    await db.cloths.insert_one(cloth_doc)

    return product_response(product_doc)


@router.get("/", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    low_stock: Optional[bool] = None,
    out_of_stock: Optional[bool] = None,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    query = {"user_id": ObjectId(current_user["_id"])}
    if category:
        query["category"] = category
    if search:
        query["name"] = {"$regex": search, "$options": "i"}

    cursor = db.products.find(query).sort("created_at", -1)
    products = await cursor.to_list(length=1000)

    if low_stock or out_of_stock:
        filtered = []
        for product in products:
            sizes = product.get("sizes", [])
            if out_of_stock and any(s["quantity"] == 0 for s in sizes):
                filtered.append(product)
            elif low_stock and any(0 < s["quantity"] <= 5 for s in sizes):
                filtered.append(product)
        products = filtered

    return [product_response(p) for p in products]


@router.get("/stats/dashboard")
async def get_dashboard_stats(
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    cursor = db.products.find({"user_id": ObjectId(current_user["_id"])})
    products = await cursor.to_list(length=1000)

    total_inventory = 0
    low_stock_count = 0
    out_of_stock_count = 0

    for product in products:
        sizes = product.get("sizes", [])
        product_total = sum(s["quantity"] for s in sizes)
        total_inventory += product_total
        if any(0 < s["quantity"] <= 5 for s in sizes):
            low_stock_count += 1
        if any(s["quantity"] == 0 for s in sizes):
            out_of_stock_count += 1

    return {
        "total_products": len(products),
        "total_inventory": total_inventory,
        "low_stock": low_stock_count,
        "out_of_stock": out_of_stock_count
    }


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    product = await db.products.find_one({
        "_id": ObjectId(product_id),
        "user_id": ObjectId(current_user["_id"])
    })
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_response(product)


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    product_data: ProductUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")

    update_data: dict = {"updated_at": datetime.utcnow()}
    if product_data.name is not None:
        update_data["name"] = product_data.name
    if product_data.category is not None:
        update_data["category"] = product_data.category
    if product_data.price is not None:
        update_data["price"] = product_data.price
    if product_data.images is not None:
        update_data["images"] = product_data.images
    if product_data.sizes is not None:
        update_data["sizes"] = [size.dict() for size in product_data.sizes]

    result = await db.products.find_one_and_update(
        {"_id": ObjectId(product_id), "user_id": ObjectId(current_user["_id"])},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")

    # ── Sync name + images to production and cloth if changed ─────────────────
    sync: dict = {}

    if product_data.name is not None:
        sync["name"] = product_data.name

    if product_data.images is not None:
        sync["images"] = product_data.images

    if sync:
        sync["updated_at"] = datetime.utcnow()

        # Production: sync name + images only
        await db.production.update_many(
            {
                "product_id": ObjectId(product_id),
                "user_id": ObjectId(current_user["_id"])
            },
            {"$set": sync}
        )

        # Cloths: sync name + images only
        await db.cloths.update_many(
            {
                "product_id": ObjectId(product_id),
                "user_id": ObjectId(current_user["_id"])
            },
            {"$set": sync}
        )
        sync["updated_at"] = datetime.utcnow()
        await db.production.update_many(
            {"product_id": ObjectId(product_id), "user_id": ObjectId(current_user["_id"])},
            {"$set": sync}
        )
        await db.cloths.update_many(
            {"product_id": ObjectId(product_id), "user_id": ObjectId(current_user["_id"])},
            {"$set": sync}
        )

    return product_response(result)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")

    result = await db.products.delete_one({
        "_id": ObjectId(product_id),
        "user_id": ObjectId(current_user["_id"])
    })
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    # ── Auto-delete linked production and cloth entries ───────────────────────
    await db.production.delete_many({
        "product_id": ObjectId(product_id),
        "user_id": ObjectId(current_user["_id"])
    })
    await db.cloths.delete_many({
        "product_id": ObjectId(product_id),
        "user_id": ObjectId(current_user["_id"])
    })
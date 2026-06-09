# # from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
# # from ..core.config import settings
# # from typing import Optional

# # class MongoDB:
# #     client: Optional[AsyncIOMotorClient] = None
# #     db: Optional[AsyncIOMotorDatabase] = None


# # mongodb = MongoDB()


# # async def connect_to_mongo():
# #     """Connect to MongoDB"""
# #     mongodb.client = AsyncIOMotorClient(settings.MONGODB_URL)
# #     mongodb.db = mongodb.client[settings.DATABASE_NAME]
# #     print(f"✅ Connected to MongoDB database: {settings.DATABASE_NAME}")
    
# #     # Create indexes
# #     await create_indexes()


# # async def close_mongo_connection():
# #     """Close MongoDB connection"""
# #     if mongodb.client:
# #         mongodb.client.close()
# #         print("❌ Closed MongoDB connection")


# # async def create_indexes():
# #     """Create database indexes"""
# #     if mongodb.db is None:
# #         return
    
# #     # Users collection indexes
# #     await mongodb.db.users.create_index("email", unique=True)
    
# #     # Products collection indexes
# #     await mongodb.db.products.create_index("name")
# #     await mongodb.db.products.create_index("category")
# #     await mongodb.db.products.create_index("created_at")
    
# #     # Production collection indexes
# #     await mongodb.db.production.create_index("name")
# #     await mongodb.db.production.create_index("category")
# #     await mongodb.db.production.create_index("created_at")
    
# #     # Categories collection indexes
# #     await mongodb.db.categories.create_index(
# #         [("user_id", 1), ("name", 1)],
# #         unique=True
# #     )    
# #     # Sizes collection indexes
# #     await mongodb.db.sizes.create_index(
# #         [("user_id", 1), ("name", 1)],
# #         unique=True
# #     )
    
# #     print("✅ Database indexes created")


# # def get_database() -> AsyncIOMotorDatabase:
# #     """Get database instance"""
# #     return mongodb.db


# from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
# from ..core.config import settings
# from typing import Optional


# class MongoDB:
#     client: Optional[AsyncIOMotorClient] = None
#     db: Optional[AsyncIOMotorDatabase] = None


# mongodb = MongoDB()


# async def connect_to_mongo():
#     """Connect to MongoDB"""
#     mongodb.client = AsyncIOMotorClient(settings.MONGODB_URL)
#     mongodb.db = mongodb.client[settings.DATABASE_NAME]
#     print(f"✅ Connected to MongoDB database: {settings.DATABASE_NAME}")

#     # Create indexes
#     await create_indexes()


# async def close_mongo_connection():
#     """Close MongoDB connection"""
#     if mongodb.client:
#         mongodb.client.close()
#         print("❌ Closed MongoDB connection")


# async def create_indexes():
#     """Create database indexes"""
#     if mongodb.db is None:
#         return

#     # Users collection indexes
#     await mongodb.db.users.create_index("email", unique=True)

#     # Products collection indexes
#     await mongodb.db.products.create_index("name")
#     await mongodb.db.products.create_index("category")
#     await mongodb.db.products.create_index("created_at")
#     await mongodb.db.products.create_index("user_id")

#     # Production collection indexes
#     await mongodb.db.production.create_index("name")
#     await mongodb.db.production.create_index("category")
#     await mongodb.db.production.create_index("created_at")
#     await mongodb.db.production.create_index("user_id")
#     await mongodb.db.production.create_index("product_id")

#     # Cloths collection indexes
#     await mongodb.db.cloths.create_index("name")
#     await mongodb.db.cloths.create_index("created_at")
#     await mongodb.db.cloths.create_index("user_id")
#     await mongodb.db.cloths.create_index("product_id")

#     # Categories collection indexes
#     await mongodb.db.categories.create_index(
#         [("user_id", 1), ("name", 1)],
#         unique=True,
#     )

#     # Sizes collection indexes
#     await mongodb.db.sizes.create_index(
#         [("user_id", 1), ("name", 1)],
#         unique=True,
#     )

#     print("✅ Database indexes created")


# def get_database() -> AsyncIOMotorDatabase:
#     """Get database instance"""
#     return mongodb.db


from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from ..core.config import settings
from typing import Optional


class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None


mongodb = MongoDB()


async def connect_to_mongo():
    mongodb.client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        # Connection pool — keeps connections alive, reduces per-request overhead
        maxPoolSize=10,
        minPoolSize=2,
        # Timeout settings for Render free tier
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        socketTimeoutMS=10000,
    )
    mongodb.db = mongodb.client[settings.DATABASE_NAME]
    print(f"✅ Connected to MongoDB: {settings.DATABASE_NAME}")
    await create_indexes()


async def close_mongo_connection():
    if mongodb.client:
        mongodb.client.close()
        print("❌ Closed MongoDB connection")


async def create_indexes():
    if mongodb.db is None:
        return

    # ── Users ────────────────────────────────────────────────────────────────
    await mongodb.db.users.create_index("email", unique=True)

    # ── Products ─────────────────────────────────────────────────────────────
    # Most queries filter by user_id first, then sort/filter by other fields.
    # Compound indexes match these exact query patterns.

    # GET /products/ — list all for user, sorted by created_at desc
    await mongodb.db.products.create_index(
        [("user_id", 1), ("created_at", -1)]
    )
    # GET /products/?category=X
    await mongodb.db.products.create_index(
        [("user_id", 1), ("category", 1), ("created_at", -1)]
    )
    # GET /products/?search=X (text search)
    await mongodb.db.products.create_index(
        [("user_id", 1), ("name", "text")]
    )
    # GET /products/stats/dashboard
    await mongodb.db.products.create_index(
        [("user_id", 1), ("sizes.quantity", 1)]
    )

    # ── Production ───────────────────────────────────────────────────────────
    await mongodb.db.production.create_index(
        [("user_id", 1), ("created_at", -1)]
    )
    await mongodb.db.production.create_index(
        [("user_id", 1), ("category", 1)]
    )
    # For auto-delete when product is deleted
    await mongodb.db.production.create_index(
        [("product_id", 1), ("user_id", 1)]
    )

    # ── Cloths ───────────────────────────────────────────────────────────────
    await mongodb.db.cloths.create_index(
        [("user_id", 1), ("created_at", -1)]
    )
    await mongodb.db.cloths.create_index(
        [("product_id", 1), ("user_id", 1)]
    )

    # ── Categories ───────────────────────────────────────────────────────────
    await mongodb.db.categories.create_index(
        [("user_id", 1), ("name", 1)],
        unique=True,
    )

    # ── Sizes ────────────────────────────────────────────────────────────────
    await mongodb.db.sizes.create_index(
        [("user_id", 1), ("name", 1)],
        unique=True,
    )

    print("✅ Database indexes created")


def get_database() -> AsyncIOMotorDatabase:
    return mongodb.db

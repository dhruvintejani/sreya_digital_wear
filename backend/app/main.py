# # # from fastapi import FastAPI
# # # from fastapi.middleware.cors import CORSMiddleware
# # # from .api import uploads
# # # from contextlib import asynccontextmanager
# # # from .database.mongodb import connect_to_mongo, close_mongo_connection
# # # from .api import auth, products, production, categories
# # # from .core.config import settings


# # # @asynccontextmanager
# # # async def lifespan(app: FastAPI):
# # #     # Startup
# # #     await connect_to_mongo()
# # #     yield
# # #     # Shutdown
# # #     await close_mongo_connection()


# # # app = FastAPI(
# # #     title="Sreya Digital Wear API",
# # #     description="Inventory and Production Management System API",
# # #     version="1.0.0",
# # #     lifespan=lifespan
# # # )

# # # # CORS Configuration
# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
# # #     allow_credentials=True,
# # #     allow_methods=["*"],
# # #     allow_headers=["*"],
# # # )

# # # # Include routers
# # # app.include_router(auth.router, prefix="/api")
# # # app.include_router(products.router, prefix="/api")
# # # app.include_router(production.router, prefix="/api")
# # # app.include_router(categories.router, prefix="/api")
# # # app.include_router(uploads.router, prefix="/api")


# # # @app.get("/")
# # # async def root():
# # #     return {
# # #         "message": "Sreya Digital Wear API",
# # #         "version": "1.0.0",
# # #         "status": "running"
# # #     }


# # # @app.get("/health")
# # # async def health_check():
# # #     return {"status": "healthy"}


# # # if __name__ == "__main__":
# # #     import uvicorn
# # #     uvicorn.run(
# # #         "app.main:app",
# # #         host=settings.BACKEND_HOST,
# # #         port=settings.BACKEND_PORT,
# # #         reload=True
# # #     )


# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from .api import uploads
# # from contextlib import asynccontextmanager
# # from .database.mongodb import connect_to_mongo, close_mongo_connection
# # from .api import auth, products, production, categories
# # from .core.config import settings


# # @asynccontextmanager
# # async def lifespan(app: FastAPI):
# #     await connect_to_mongo()
# #     yield
# #     await close_mongo_connection()


# # app = FastAPI(
# #     title="Sreya Digital Wear API",
# #     description="Inventory and Production Management System API",
# #     version="1.0.0",
# #     lifespan=lifespan
# # )

# # # Allow both 5173 and 5174 plus whatever is in .env
# # allowed_origins = list({
# #     settings.FRONTEND_URL,
# #     "http://localhost:5173",
# #     "http://localhost:5174",
# #     "http://127.0.0.1:5173",
# #     "http://127.0.0.1:5174",
# # })

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=allowed_origins,
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # Include routers
# # app.include_router(auth.router, prefix="/api")
# # app.include_router(products.router, prefix="/api")
# # app.include_router(production.router, prefix="/api")
# # app.include_router(categories.router, prefix="/api")
# # app.include_router(uploads.router, prefix="/api")


# # @app.get("/")
# # async def root():
# #     return {
# #         "message": "Sreya Digital Wear API",
# #         "version": "1.0.0",
# #         "status": "running"
# #     }


# # @app.get("/health")
# # async def health_check():
# #     return {"status": "healthy"}


# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(
# #         "app.main:app",
# #         host=settings.BACKEND_HOST,
# #         port=settings.BACKEND_PORT,
# #         reload=True
# #     )

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from .api import uploads
# from contextlib import asynccontextmanager
# from .database.mongodb import connect_to_mongo, close_mongo_connection
# from .api import auth, products, production, categories, cloths
# from .core.config import settings


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     await connect_to_mongo()
#     yield
#     await close_mongo_connection()


# app = FastAPI(
#     title="Sreya Digital Wear API",
#     description="Inventory and Production Management System API",
#     version="1.0.0",
#     lifespan=lifespan
# )

# allowed_origins = [
#     settings.FRONTEND_URL,
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=allowed_origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth.router, prefix="/api")
# app.include_router(products.router, prefix="/api")
# app.include_router(production.router, prefix="/api")
# app.include_router(categories.router, prefix="/api")
# app.include_router(uploads.router, prefix="/api")
# app.include_router(cloths.router, prefix="/api")


# @app.get("/")
# async def root():
#     return {
#         "message": "Sreya Digital Wear API",
#         "version": "1.0.0",
#         "status": "running"
#     }


# @app.get("/health")
# async def health_check():
#     return {"status": "healthy"}


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app.main:app",
#         host=settings.BACKEND_HOST,
#         port=settings.BACKEND_PORT,
#         reload=True
#     )


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from .database.mongodb import connect_to_mongo, close_mongo_connection
from .api import auth, products, production, categories, cloths
from .api import uploads
from .core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="Sreya Digital Wear API",
    version="1.0.0",
    # Disable docs in production to reduce overhead
    docs_url="/docs" if settings.BACKEND_ENV == "development" else None,
    redoc_url=None,
    lifespan=lifespan,
)

# ── GZip compression — reduces response size by 60-80% ──────────────────────
# minimum_size=500 means only compress responses > 500 bytes
app.add_middleware(GZipMiddleware, minimum_size=500)

# ── CORS ─────────────────────────────────────────────────────────────────────
allowed_origins = list({
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
})

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Cache preflight for 1 hour — eliminates OPTIONS round-trips
    max_age=3600,
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(production.router, prefix="/api")
app.include_router(categories.router, prefix="/api")
app.include_router(uploads.router, prefix="/api")
app.include_router(cloths.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Sreya Digital Wear API", "version": "1.0.0", "status": "running"}


@app.get("/health")
async def health_check():
    """Used by UptimeRobot to keep Render free tier warm."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=True,
        # Keep-alive reduces connection setup time per request
        timeout_keep_alive=30,
    )

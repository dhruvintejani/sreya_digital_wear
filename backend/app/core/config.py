# from pydantic_settings import BaseSettings
# from typing import Optional


# class Settings(BaseSettings):
#     # MongoDB
#     MONGODB_URL: str = "mongodb://localhost:27017"
#     DATABASE_NAME: str = "sdw"
    
#     # JWT
#     JWT_SECRET: str
#     JWT_REFRESH_SECRET: str
#     ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
#     REFRESH_TOKEN_EXPIRE_DAYS: int = 7
#     ALGORITHM: str = "HS256"
    
#     # CORS
#     FRONTEND_URL: str = "http://localhost:5173"
    
#     # Server
#     BACKEND_HOST: str = "0.0.0.0"
#     BACKEND_PORT: int = 8000

#     # Cloudinary
#     CLOUDINARY_CLOUD_NAME: str
#     CLOUDINARY_API_KEY: str
#     CLOUDINARY_API_SECRET: str
    
#     class Config:
#         env_file = ".env"
#         case_sensitive = True


# settings = Settings()


from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "sdw"

    JWT_SECRET: str
    JWT_REFRESH_SECRET: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    ALGORITHM: str = "HS256"

    FRONTEND_URL: str = "http://localhost:5173"

    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    class Config:
        env_file = ".env"


settings = Settings()
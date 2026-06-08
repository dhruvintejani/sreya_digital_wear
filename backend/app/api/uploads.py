# # # # from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
# # # # from cloudinary.uploader import upload
# # # # from ..middleware.auth import get_current_user

# # # # router = APIRouter(prefix="/uploads", tags=["Uploads"])


# # # # @router.post("/image")
# # # # async def upload_image(
# # # #     file: UploadFile = File(...),
# # # #     current_user: dict = Depends(get_current_user)
# # # # ):
# # # #     try:
# # # #         result = upload(
# # # #             file.file,
# # # #             folder="sdw"
# # # #         )

# # # #         return {
# # # #             "url": result["secure_url"],
# # # #             "public_id": result["public_id"]
# # # #         }

# # # #     except Exception as e:
# # # #         raise HTTPException(
# # # #             status_code=500,
# # # #             detail=str(e)
# # # #         )

# # # from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
# # # from cloudinary.uploader import upload
# # # from ..middleware.auth import get_current_user

# # # router = APIRouter(
# # #     prefix="/uploads",
# # #     tags=["Uploads"]
# # # )


# # # @router.post("/image")
# # # async def upload_image(
# # #     file: UploadFile = File(...),
# # #     current_user: dict = Depends(get_current_user)
# # # ):
# # #     try:
# # #         result = upload(
# # #             file.file,
# # #             folder="sdw"
# # #         )

# # #         return {
# # #             "url": result["secure_url"],
# # #             "public_id": result["public_id"]
# # #         }

# # #     except Exception as e:
# # #         raise HTTPException(
# # #             status_code=500,
# # #             detail=str(e)
# # #         )

# # import cloudinary
# # import cloudinary.uploader
# # from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
# # from ..middleware.auth import get_current_user
# # from ..core.config import settings

# # # Configure Cloudinary once at module level
# # cloudinary.config(
# #     cloud_name=settings.CLOUDINARY_CLOUD_NAME,
# #     api_key=settings.CLOUDINARY_API_KEY,
# #     api_secret=settings.CLOUDINARY_API_SECRET,
# #     secure=True,
# # )

# # router = APIRouter(prefix="/uploads", tags=["Uploads"])


# # @router.post("/image")
# # async def upload_image(
# #     file: UploadFile = File(...),
# #     current_user: dict = Depends(get_current_user),
# # ):
# #     """Upload an image to Cloudinary and return its URL."""
# #     # Validate content type
# #     if not file.content_type or not file.content_type.startswith("image/"):
# #         raise HTTPException(status_code=400, detail="File must be an image")

# #     try:
# #         result = cloudinary.uploader.upload(
# #             file.file,
# #             folder=f"sdw/{current_user['_id']}",
# #             resource_type="image",
# #         )
# #         return {
# #             "url": result["secure_url"],
# #             "public_id": result["public_id"],
# #         }
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


# # @router.delete("/image/{public_id:path}")
# # async def delete_image(
# #     public_id: str,
# #     current_user: dict = Depends(get_current_user),
# # ):
# #     """Delete an image from Cloudinary by its public_id."""
# #     try:
# #         result = cloudinary.uploader.destroy(public_id)
# #         return {"success": True, "result": result}
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")


# import cloudinary
# import cloudinary.uploader
# from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
# from ..middleware.auth import get_current_user
# from ..core.config import settings

# # Configure Cloudinary at import time using settings from .env
# cloudinary.config(
#     cloud_name=settings.CLOUDINARY_CLOUD_NAME,
#     api_key=settings.CLOUDINARY_API_KEY,
#     api_secret=settings.CLOUDINARY_API_SECRET,
#     secure=True,
# )

# router = APIRouter(prefix="/uploads", tags=["Uploads"])


# @router.post("/image")
# async def upload_image(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user),
# ):
#     if not file.content_type or not file.content_type.startswith("image/"):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="File must be an image",
#         )
#     try:
#         result = cloudinary.uploader.upload(
#             file.file,
#             folder=f"sdw/{current_user['_id']}",
#             resource_type="image",
#         )
#         return {
#             "url": result["secure_url"],
#             "public_id": result["public_id"],
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Upload failed: {str(e)}",
#         )


# @router.delete("/image/{public_id:path}")
# async def delete_image(
#     public_id: str,
#     current_user: dict = Depends(get_current_user),
# ):
#     try:
#         result = cloudinary.uploader.destroy(public_id)
#         return {"success": True, "result": result}
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Delete failed: {str(e)}",
#         )


import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from ..middleware.auth import get_current_user
from ..core.config import settings

# ── Configure Cloudinary immediately at import time ──────────────────────────
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

router = APIRouter(prefix="/uploads", tags=["Uploads"])


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    """Upload an image file to Cloudinary. Returns the secure URL and public_id."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed.",
        )

    try:
        contents = await file.read()
        result = cloudinary.uploader.upload(
            contents,
            folder=f"sdw/{current_user['_id']}",
            resource_type="image",
        )
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Upload failed: {str(e)}",
        )


@router.delete("/image/{public_id:path}")
async def delete_image(
    public_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete an image from Cloudinary by public_id."""
    try:
        result = cloudinary.uploader.destroy(public_id)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Delete failed: {str(e)}",
        )
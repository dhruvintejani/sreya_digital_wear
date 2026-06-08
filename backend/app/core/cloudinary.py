from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from ..middleware.auth import get_current_user
import cloudinary
import cloudinary.uploader
from ..core.config import settings

router = APIRouter(prefix="/uploads", tags=["Uploads"])

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        result = cloudinary.uploader.upload(
            file.file,
            folder=f"sdw/{current_user['_id']}"
        )

        return {
            "url": result["secure_url"],
            "public_id": result["public_id"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete("/image/{public_id:path}")
async def delete_image(
    public_id: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        result = cloudinary.uploader.destroy(public_id)

        return {
            "success": True,
            "result": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
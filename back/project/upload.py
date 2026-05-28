import os
import cloudinary
import cloudinary.uploader
from pathlib import Path

# Вставьте сюда свои данные из аккаунта Cloudinary
CLOUD_NAME = "difsrxhrl"
API_KEY = "636383223549436"
API_SECRET = "F8qIDLROYtg1yVVTDiRGRhO1ONg"

cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET
)

media_folder = Path(__file__).parent / "media"

for root, dirs, files in os.walk(media_folder):
    for file in files:
        file_path = os.path.join(root, file)
        relative = os.path.relpath(file_path, media_folder)
        print(f"Загружаю: {relative}")
        cloudinary.uploader.upload(
            file_path,
            folder="django_media",
            use_filename=True,
            unique_filename=False
        )
print("Готово!")
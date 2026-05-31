import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
import django
django.setup()

from app.models import Product

CLOUD_NAME = 'difsrxhrl'

for product in Product.objects.all():
    if product.image:
        # Извлекаем только имя файла, игнорируя возможную папку
        filename = product.image.split('/')[-1]
        # Формируем правильный относительный путь с папкой
        new_image_path = f"products/{filename}"
        # Строим полный URL
        full_url = f"https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{new_image_path}"
        if product.image != full_url:
            product.image = full_url
            product.save()
            print(f"Обновлён {product.name}: {full_url}")
        else:
            print(f"Уже правильный: {product.name}")

print("Готово!")
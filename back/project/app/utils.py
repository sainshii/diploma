# utils.py
from django.utils import timezone
from .models import Promotion

def get_discounted_price(product, original_price):
    now = timezone.now()
    promotions = Promotion.objects.filter(
        is_active=True,
        start_date__lte=now,
        end_date__gte=now
    )
    best_price = float(original_price)

    for promo in promotions:
        applies = False
        if promo.apply_to == 'all':
            applies = True
        elif promo.apply_to == 'categories':
            if promo.categories.filter(id=product.category.id).exists():
                applies = True
        elif promo.apply_to == 'products':
            if promo.products.filter(id=product.id).exists():
                applies = True

        if not applies:
            continue

        discount_value = float(promo.discount_value)
        if promo.discount_type == 'percent':
            discounted = best_price * (1 - discount_value / 100)
        else:  # fixed
            discounted = best_price - discount_value

        if discounted < best_price:
            best_price = max(discounted, 0)

    return best_price
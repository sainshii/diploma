from django.contrib import admin
from .models import Category, Product, Comment, Size, User, Order, OrderItem, ContactMessage, Promotion
from .utils import upload_to_cloudinary

admin.site.register(User)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'is_popular', 'stock')
    list_filter = ('category', 'is_popular')
    fields = ('name', 'description', 'price', 'image', 'category', 'sizes', 'stock', 'is_popular', 'rating')

    def save_model(self, request, obj, form, change):
        if 'image' in form.changed_data:
            uploaded_file = form.cleaned_data.get('image')
            if uploaded_file:
                url = upload_to_cloudinary(uploaded_file)
                if url:
                    obj.image = url   # сохраняем полный URL
        super().save_model(request, obj, form, change)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at')


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'address', 'payment_method', 'status', 'total_price', 'created_at']
    list_filter = ['payment_method', 'status', 'created_at']
    search_fields = ['user__username', 'address']
    inlines = [OrderItemInline]
    fields = ['user', 'address', 'payment_method', 'status', 'total_price', 'created_at']
    readonly_fields = ['user', 'total_price', 'created_at']  # не редактируются, чтобы не сломать данные

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'size', 'quantity', 'price']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message_preview', 'created_at')
    readonly_fields = ('name', 'email', 'message', 'created_at')
    search_fields = ('name', 'email', 'message')
    list_filter = ('created_at',)

    def message_preview(self, obj):
        return obj.message

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount_type', 'discount_value', 'apply_to', 'is_active', 'start_date', 'end_date')
    list_filter = ('discount_type', 'apply_to', 'is_active')
    filter_horizontal = ('categories', 'products')
    fieldsets = (
        (None, {
            'fields': ('name', 'discount_type', 'discount_value', 'apply_to', 'is_active')
        }),
        ('Применение', {
            'fields': ('categories', 'products'),
            'description': 'Заполните только если выбран соответствующий тип применения'
        }),
        ('Даты', {
            'fields': ('start_date', 'end_date')
        }),
    )
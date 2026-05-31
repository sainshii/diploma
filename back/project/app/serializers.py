from rest_framework import serializers
from .models import *
import re
from .utils import get_discounted_price
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'email', 'password', 'avatar', 'avatar_url']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'avatar': {'write_only': True, 'required': False},
            'username': {'required': True},
            'first_name': {'required': True},
        }

    def validate_username(self, value):
        if not re.match("^[a-zA-Z0-9]+$", value):
            raise serializers.ValidationError("Только латиница и цифры")
        return value

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def create(self, validated_data):
        avatar = validated_data.pop('avatar', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', '')
        )
        if avatar:
            user.avatar = avatar
            user.save()
        return user


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'username', 'avatar']
        extra_kwargs = {
            'first_name': {'required': False},
            'username': {'required': False},
            'avatar': {'required': False},
        }

    def validate_username(self, value):
        if not re.match("^[a-zA-Z0-9]+$", value):
            raise serializers.ValidationError("Только латиница и цифры")
        return value


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'subcategories']

    def get_subcategories(self, obj):
        if obj.parent is None:
            return CategorySerializer(obj.subcategories.all(), many=True).data
        return []


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name']


class ProductListSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    sizes = SizeSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discounted_price', 'image', 'category', 'sizes', 'rating', 'is_popular']

    def get_discounted_price(self, obj):
        return get_discounted_price(obj, float(obj.price))

    def get_image(self, obj):
        if obj.image:
            return str(obj.image)
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    sizes = SizeSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    discounted_price = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'discounted_price', 'image', 'category', 'sizes', 'stock', 'rating', 'comments']

    def get_discounted_price(self, obj):
        return get_discounted_price(obj, float(obj.price))

    def get_comments(self, obj):
        comments = obj.comments.all().order_by('-created_at')
        return CommentSerializer(comments, many=True, context=self.context).data

    def get_image(self, obj):
        if obj.image:
            return str(obj.image)
        return None


class UserPublicSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'avatar_url']

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None


class CommentSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    created_at = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'rating', 'created_at']


class CommentCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    rating = serializers.IntegerField(min_value=1, max_value=5)

    class Meta:
        model = Comment
        fields = ['text', 'rating', 'user']

    def create(self, validated_data):
        # Достаём product из контекста, который передали во view
        product = self.context.get('product')
        if not product:
            raise serializers.ValidationError('Товар не указан')
        # Добавляем product в данные и создаём комментарий
        validated_data['product'] = product
        return super().create(validated_data)


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'size', 'quantity', 'discounted_price']

    def get_discounted_price(self, obj):
        return get_discounted_price(obj.product, float(obj.product.price)) * obj.quantity


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price', 'total_items']

    def get_total_price(self, obj):
        total = 0
        for item in obj.items.all():
            discounted = get_discounted_price(item.product, float(item.product.price))
            total += discounted * item.quantity
        return total

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())
    

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'size', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'payment_method', 'status', 'total_price', 'created_at', 'items']
        read_only_fields = ['user', 'created_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField()),
        write_only=True
    )

    class Meta:
        model = Order
        fields = ['address', 'payment_method', 'total_price', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)

        for item in items_data:
            product_id = int(item['product'])
            product = Product.objects.get(id=product_id)
            size = item['size']
            quantity = int(item['quantity'])
            discounted_price = get_discounted_price(product, float(product.price))
            OrderItem.objects.create(
                order=order,
                product=product,
                size=size,
                quantity=quantity,
                price=discounted_price   # сохраняем цену со скидкой на момент заказа
            )
        return order
    

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
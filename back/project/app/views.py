from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import *
from .models import *
from django.http import HttpResponse
from django.urls import reverse
from django.utils import timezone
from django.db.models import F, Q

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def patch(self, request):
        serializer = ProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(request.user, context={'request': request}).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegApiView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'success': True,
                'token': token.key,
                'user_id': user.id,
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthApiView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Такого пользователя не существует',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'success': True,
            'token': token.key,
            'user_id': user.id,
            'email': user.email
        })

class UploadAvatarView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        user = request.user
        file = request.FILES.get('avatar')
        if not file:
            return Response({'error': 'Файл не найден'}, status=status.HTTP_400_BAD_REQUEST)
        if not file.content_type.startswith('image/'):
            return Response({'error': 'Можно загружать только изображения'}, status=status.HTTP_400_BAD_REQUEST)
        if user.avatar:
            user.avatar.delete(save=False)
        user.avatar = file
        user.save()
        avatar_url = request.build_absolute_uri(user.avatar.url) if user.avatar else None
        return Response({'avatar_url': avatar_url}, status=status.HTTP_200_OK)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None).prefetch_related('subcategories')
    serializer_class = CategorySerializer
    permission_classes = []

class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Product.objects.all().order_by('id')
        category_slug = self.request.query_params.get('category')
        popular = self.request.query_params.get('popular')
        discounted = self.request.query_params.get('discounted')

        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if popular and popular.lower() == 'true':
            queryset = queryset.filter(is_popular=True)
        if discounted and discounted.lower() == 'true':
            all_products = list(queryset)
            discounted_products = []
            for p in all_products:
                discounted_price = get_discounted_price(p, float(p.price))
                if discounted_price < float(p.price):
                    discounted_products.append(p.id)
            queryset = queryset.filter(id__in=discounted_products)
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = []

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        try:
            context['product'] = Product.objects.get(pk=self.kwargs['product_id'])
        except Product.DoesNotExist:
            context['product'] = None
        return context

    def perform_create(self, serializer):
        serializer.save()

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

# Корзина
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

class CartAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        size = request.data.get('size')
        quantity = int(request.data.get('quantity', 1))
        if not product_id or not size:
            return Response({'error': 'product_id и size обязательны'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product, size=size,
            defaults={'quantity': quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartItemSerializer(cart_item, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class CartUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Элемент не найден'}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({'error': 'quantity обязателен'}, status=status.HTTP_400_BAD_REQUEST)
        quantity = int(quantity)
        if quantity <= 0:
            item.delete()
            return Response({'detail': 'Элемент удалён'}, status=status.HTTP_204_NO_CONTENT)
        item.quantity = quantity
        item.save()

        serializer = CartItemSerializer(item, context={'request': request})
        return Response(serializer.data)

class CartRemoveView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Элемент не найден'}, status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Очистка корзины
class CartClearView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def delete(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if cart:
            cart.items.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Заказы
class OrderList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items').order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save()

class ResetPasswordView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        if not email or not new_password:
            return Response({'error': 'Email и новый пароль обязательны'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь с таким email не найден'}, status=status.HTTP_404_NOT_FOUND)
        user.set_password(new_password)
        user.save()
        return Response({'success': True})

def sitemap_view(request):

    base_url = 'https://bauta.vercel.app'

    static_urls = [
        {'loc': f'{base_url}/', 'priority': '1.0'},
        {'loc': f'{base_url}/history', 'priority': '0.8'},
        {'loc': f'{base_url}/masks', 'priority': '0.9'},
        {'loc': f'{base_url}/shop', 'priority': '0.9'},
    ]

    products = Product.objects.all()
    product_urls = []
    for product in products:
        product_urls.append({
            'loc': f'{base_url}/product/{product.id}',
            'priority': '0.7'
        })

    all_urls = static_urls + product_urls

    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for url in all_urls:
        xml.append('  <url>')
        xml.append(f'    <loc>{url["loc"]}</loc>')
        xml.append(f'    <priority>{url["priority"]}</priority>')
        xml.append('  </url>')
    xml.append('</urlset>')

    return HttpResponse('\n'.join(xml), content_type='application/xml')

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactSerializer
    permission_classes = []


class ActivePromotionView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request):
        now = timezone.now()
        promo = Promotion.objects.filter(
            is_active=True,
            start_date__lte=now,
            end_date__gte=now
        ).first()
        if promo:
            return Response({'name': promo.name})
        return Response({})
from django.urls import path
from .views import *

urlpatterns = [
    path('list/', UserListView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('register/', RegApiView.as_view()),
    path('login/', AuthApiView.as_view()),
    path('api/upload-avatar/', UploadAvatarView.as_view(), name='upload-avatar'),
    path('api/categories/', CategoryListView.as_view(), name='categories'),
    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/products/<int:product_id>/comments/', CommentCreateView.as_view(), name='create-comment'),
    path('api/cart/', CartView.as_view(), name='cart'),
    path('api/cart/add/', CartAddView.as_view(), name='cart-add'),
    path('api/cart/update/<int:item_id>/', CartUpdateView.as_view(), name='cart-update'),
    path('api/cart/remove/<int:item_id>/', CartRemoveView.as_view(), name='cart-remove'),
    path('api/orders/', OrderList.as_view(), name='order-list'),
    path('api/cart/clear/', CartClearView.as_view(), name='cart-clear'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('sitemap.xml', sitemap_view, name='sitemap'),
    path('api/contact/', ContactCreateView.as_view(), name='contact-create'),
    path('api/active-promotion/', ActivePromotionView.as_view()),
    path('api/comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]
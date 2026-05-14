from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('list/', UserListView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('register/', RegApiView.as_view()),
    path('login/', AuthApiView.as_view()),
    path('api/upload-avatar/', UploadAvatarView.as_view(), name='upload-avatar'),
]

# В режиме отладки Django сам раздаёт загруженные файлы
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
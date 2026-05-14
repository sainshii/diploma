from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import *
from .serializers import *
from .models import *

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
            # Возвращаем полные данные пользователя после обновления
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

# ↓ новый класс
class UploadAvatarView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        user = request.user
        file = request.FILES.get('avatar')
        if not file:
            return Response({'error': 'Файл не найден'}, status=status.HTTP_400_BAD_REQUEST)

        # проверка на тип файла (опционально)
        if not file.content_type.startswith('image/'):
            return Response({'error': 'Можно загружать только изображения'}, status=status.HTTP_400_BAD_REQUEST)

        # удаляем старый аватар, если есть (чтобы не засорять диск)
        if user.avatar:
            user.avatar.delete(save=False)

        user.avatar = file
        user.save()

        # Возвращаем новый URL
        avatar_url = request.build_absolute_uri(user.avatar.url) if user.avatar else None
        return Response({'avatar_url': avatar_url}, status=status.HTTP_200_OK)
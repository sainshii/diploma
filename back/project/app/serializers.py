from rest_framework import serializers
from .models import User
import re

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
            raise serializers.ValidationError("Имя пользователя может содержать только латинские буквы и цифры.")
        return value

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def create(self, validated_data):
        # Удаляем avatar, если есть, чтобы передать после создания
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
        import re
        if not re.match("^[a-zA-Z0-9]+$", value):
            raise serializers.ValidationError("Только латиница и цифры")
        return value
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password':{'write_only':True},
            'email':{'required':True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

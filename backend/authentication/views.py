import os
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile


def flatten_errors(errors: dict):
    all_errors = []

    for field in errors.keys():
        all_errors.extend(errors[field])

    return all_errors

class CreateUserView(APIView):

    permission_classes = [AllowAny]
    
    def post(self, request):
        if User.objects.filter(email=request.data['email']).exists():
            return Response({"errors": ["This email is already taken"]}, status.HTTP_400_BAD_REQUEST)

        user_ser = UserSerializer(data=request.data)
        
        if user_ser.is_valid():
            user = user_ser.save()
            user.is_active = True
            user.save()
            
            profile_ser = ProfileSerializer(data={"user": user.id})
            
            if profile_ser.is_valid():
                profile_ser.save()
                
                
                return Response({"messages": ["User created successfully!"]}, status.HTTP_201_CREATED)
        
        return Response({"errors": flatten_errors(user_ser.errors)}, status.HTTP_400_BAD_REQUEST)
                
            
class GetProfileView(APIView):
    
    def get(self, request):
        user = request.user
        
        profile = Profile.objects.get(user=user.pk)
        profile_data = {'profile': {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "avatar": profile.avatar.url
            }}
        
        return Response(profile_data, status.HTTP_200_OK)
    
    
class UpdateAvatarView(APIView):

    
    def post(self, request):
        profile = Profile.objects.get(user=request.user.id)
        print(request.data)
        old_pic_path = profile.avatar.path
        
        ser = ProfileSerializer(instance=profile, data=request.data, partial=True)
        
        if ser.is_valid():
            ser.save()
            
            if os.path.exists(old_pic_path):
                os.remove(old_pic_path)
        
            return Response({"messages": ["Avatar successfully updated!"]}, status.HTTP_200_OK)
        return Response("smth is wrong", status.HTTP_400_BAD_REQUEST)
    

    
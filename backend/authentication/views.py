from django.contrib.auth.models import User
from rest_framework.views import APIView
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
                
            
    
    

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path("token/obtain/", TokenObtainPairView.as_view(), name="obtain_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"), 
    path("create/", views.CreateUserView.as_view(), name="create_user"),
    path("get/", views.GetProfileView.as_view()),
    path("avatar/", views.UpdateAvatarView.as_view())
]



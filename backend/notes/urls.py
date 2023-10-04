from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import FolderViewSet, NoteViewSet


router = DefaultRouter()
router.register(r"", NoteViewSet)
router.register(r"folder/", FolderViewSet)

urlpatterns = router.urls

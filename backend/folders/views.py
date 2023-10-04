from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .serializers import FolderSerializer
from .models import Folder


class FolderViewSet(ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    # permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user

        queryset = Folder.objects.filter(user=user)
        return queryset
    
    

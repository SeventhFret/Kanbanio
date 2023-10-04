from rest_framework.viewsets import ModelViewSet
from .serializers import FolderSerializer
from .models import Folder


class FolderViewSet(ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    
    def get_queryset(self):
        user = self.request.user

        queryset = Folder.objects.filter(user=user)
        return queryset
    
    

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import FolderSerializer
from .models import Folder


class FolderViewSet(ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    
    def get_queryset(self):
        user = self.request.user
        queryset = Folder.objects.filter(user=user)
        folder_type = self.request.GET.get("type", None)
        
        if folder_type == "N":
            queryset = queryset.filter(type="N")
        
        elif folder_type == "T":
            queryset = queryset.filter(type="T")

        return queryset
    

from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .serializers import NoteSerializer
from .models import Note


class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    # permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user

        queryset = Note.objects.filter(user=user)
        return queryset
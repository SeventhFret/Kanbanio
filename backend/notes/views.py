from rest_framework.viewsets import ModelViewSet
from .serializers import NoteSerializer
from .models import Note


class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        user = self.request.user

        queryset = Note.objects.filter(user=user)
        return queryset
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .serializers import TodoSerializer
from .models import Todo


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user

        queryset = Todo.objects.filter(user=user)
        return queryset
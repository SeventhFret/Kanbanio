from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .serializers import NoteSerializer
from .models import Note


class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        user = self.request.user

        queryset = Note.objects.filter(user=user)
        return queryset
    
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response({"messages": ["Created successfully!"]}, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        if 'latest' in request.GET: 
            queryset = self.get_queryset()[:6]
            ser = self.get_serializer(queryset, many=True)
            
            return Response(ser.data, status.HTTP_200_OK)
        
        return super().list(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({"errors": ["Not found"]}, status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
        
            return Response({"messages": ["Updated successfully"]}, status.HTTP_200_OK)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
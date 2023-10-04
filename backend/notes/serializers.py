from rest_framework import serializers
from .models import Folder, Note

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ["user", "title"]
        
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["user", "title", "created", "folder"]
from rest_framework import serializers
from .models import Note

        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "user", "title", "created", "text", "folder"]
        
    def update(self, instance, validated_data):
          for attr, value in validated_data.items():
              setattr(instance, attr, value)
          instance.save()
          return instance
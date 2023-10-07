from rest_framework import serializers
from .models import Todo

        
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "user", "title", "end_date", "folder"]
        
    def update(self, instance, validated_data):
          for attr, value in validated_data.items():
              setattr(instance, attr, value)
          instance.save()
          return instance
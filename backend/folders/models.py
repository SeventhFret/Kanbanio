from django.db import models
from django.contrib.auth.models import User

class Folder(models.Model):
    TYPE_CHOISES = (
        ("N", "Note"),
        ("T", "Todo")
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField()
    type = models.CharField(choices=TYPE_CHOISES)
    
    
    def __str__(self):
        return f"Folder {self.title} of type {self.type}"

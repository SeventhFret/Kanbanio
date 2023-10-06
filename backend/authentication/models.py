from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatars", default="avatars/default.png")
    
    def __str__(self):
        return f"Profile of {self.user.username}"


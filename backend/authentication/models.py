from random import randint
from django.db import models
from django.contrib.auth.models import User


def get_random_avatar_path():
    return f"avatars/default{randint(1, 6)}.png"

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatars", default=get_random_avatar_path)
    
    def __str__(self):
        return f"Profile of {self.user.username}"


from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
from folders.models import Folder

    
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    title = models.CharField()
    created = models.DateTimeField(default=datetime.now)

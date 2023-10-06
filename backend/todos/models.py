from django.db import models
from django.contrib.auth.models import User
from folders.models import Folder


class Todo(models.Model):
    title = models.CharField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    end_date = models.DateTimeField(null=True)

    def __str__(self):
        return f"Todo {self.title} in folder {self.folder.title}"

from django.db import models
from folders.models import Folder


class Todo(models.Model):
    title = models.CharField()
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    end_date = models.DateTimeField(null=True)


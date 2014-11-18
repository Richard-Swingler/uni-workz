from django.db import models
from django.contrib.auth.models import User

class TimetableItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    userId = models.ForeignKey(User, null=true)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
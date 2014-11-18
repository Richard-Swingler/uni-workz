from django.db import models
from django.contrib.auth.models import User

class TimetableItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    weekid = models.
    userId = models.ForeignKey(User, null=false)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
from django.db import models
from django.contrib.auth.models import User

class TimetableItem(models.Model):
    #name = models.CharField(max_length=200)
    #description = models.TextField()
    #user = models.ForeignKey(User, null=True)
    #startTime = models.IntegerField()
    #endTime = models.IntegerField()
    #day = models.IntegerField()

    #DateTimeField() - for later reference

    title = models.CharField(max_length=200)
    start = models.CharField(max_length=200)
    end = models.CharField(max_length=200)
    allDay = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True)

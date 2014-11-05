from django.db import models
from django.contrib.auth.models import User

class TimeTableItems(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    user = models.ForeignKey(User, null=True)
    startTime = models.DateTimeField()
    endDay = models.DateTimeField()
    day = models.DateTimeField('Day')
from django.db import models

class Task(models.Model):
    task_name = models.CharField(max_length=255)
    task_duration = models.IntegerField('duration')
    assigned_user = models.CharField(max_length=20)
    start_date = models.DateTimeField('start_date')

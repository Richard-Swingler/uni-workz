from django.db import models
from rest_framework import serializers
from eventlog.models import log
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.TextField()
    author = models.ForeignKey(User, null=True)

    def __unicode__(self):
    	return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            log(user=self.author, action='Added a Task',
                extra={"title": self.name})
        else:
            log(user=self.author, action='Changed a Task',
                extra={"title": self.name})

        super(Task, self).save(*args, **kwargs)

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = ('id', 'name')


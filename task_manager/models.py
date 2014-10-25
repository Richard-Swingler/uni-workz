from django.db import models
from rest_framework import serializers

class Task(models.Model):
    name = models.TextField()

    def __unicode__(self):
    	return self.name


class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		ordering = ['name']
		fields = ('id', 'name')
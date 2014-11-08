from django.contrib.auth.models import User, Group
from task_manager.models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ('id', 'name', 'description', 'author', 'startDate', 'endDate')


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group
    fields = ('url', 'name')
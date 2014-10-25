from django.shortcuts import render
from rest_framework import generics
from .models import Task, TaskSerializer

def index(request):
    return render(request, 'task_manager/index.html')

class TaskList(generics.ListCreateAPIView):
	model = Task
	serializer_class = TaskSerializer
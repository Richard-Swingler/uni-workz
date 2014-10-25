from django.shortcuts import render
from rest_framework import generics
from .models import Task, TaskSerializer

def index(request):
    return render(request, 'task_manager/index.html')

class TaskList(generics.ListCreateAPIView):
	model = Task
	serializer_class = TaskSerializer

class UpdateTask(generics.UpdateAPIView):

	def put(self, request, *args, **kwargs):
		data = request.DATA
		serializer_class = TaskSerializer(data=data, many=True)

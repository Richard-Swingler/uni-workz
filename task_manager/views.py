from django.shortcuts import render
from rest_framework import generics
from eventlog.models import Log
from .models import Task, TaskSerializer

def index(request):
    logs = Log.objects.all() [:5]
    return render(request, 'task_manager/index.html', {'logs' : logs})

class TaskList(generics.ListCreateAPIView):
	model = Task
	serializer_class = TaskSerializer

class UpdateTask(generics.UpdateAPIView):

	def put(self, request, *args, **kwargs):
		data = request.DATA
		serializer_class = TaskSerializer(data=data, many=True)

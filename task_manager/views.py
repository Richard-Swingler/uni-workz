from django.contrib.auth.models import User, Group
from django.shortcuts import render
from eventlog.models import Log
from rest_framework import viewsets
from task_manager.models import Task
from task_manager.serializers import TaskSerializer, UserSerializer, GroupSerializer

def index(request):
    logs = Log.objects.all() [:5]

    if request.user.is_authenticated():
        user_id = request.user.id
    else:
        user_id = null

    users = User.objects.all()

    return render(request, 'task_manager/index.html', {'logs': logs, 'user_id': user_id, 'users': users})

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tasks to be viewed or edited.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

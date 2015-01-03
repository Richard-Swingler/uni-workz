from django.contrib.auth.models import User, Group
from django.shortcuts import render
from rest_framework import viewsets
from timetable.models import TimetableItem
from timetable.serializers import TimetableItemSerializer

def index(request):
	if request.user.is_authenticated():
		user_id = request.user.id
		user_name= request.user.first_name
	else:
		user_id = None
		user_name = None

	return render(request, 'timetable/meetingScheduler.html', {'user_id': user_id, 'user_name':user_name})

class TimetableItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tasks to be viewed or edited.
    """
    queryset = TimetableItem.objects.all()
    serializer_class = TimetableItemSerializer


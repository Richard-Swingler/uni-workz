from django.shortcuts import render
from rest_framework import viewsets
from timetable.models import TimetableItem
from timetable.serializers import TimetableItemSerializer

def index(request):
    return render(request, 'timetable/meetingScheduler.html')

class TimetableItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tasks to be viewed or edited.
    """
    queryset = TimetableItem.objects.all()
    serializer_class = TimetableItemSerializer
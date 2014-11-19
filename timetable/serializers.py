from timetable.models import TimetableItem
from rest_framework import serializers

class TimetableItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimetableItem
    fields = ('id', 'name', 'description', 'user', 'startTime', 'endTime', 'day')
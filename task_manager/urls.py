from django.conf.urls import patterns, url

from task_manager import views
from .views import *

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
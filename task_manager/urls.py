from django.conf.urls import patterns, url

from task_manager import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
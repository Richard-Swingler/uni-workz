from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^', include('task_manager.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^timetable/', include('timetable.urls')),
    url(r'^projectOverview/', include('project_overview.urls')),
)
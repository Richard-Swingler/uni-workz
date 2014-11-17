from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from task_manager import views as TaskViews
from timetable import views as TimetableViews

task_list = TaskViews.TaskViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

task_detail = TaskViews.TaskViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

timetable_item_list = TimetableViews.TimetableItemViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

timetable_item_detail = TimetableViews.TimetableItemViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

api_patterns = patterns('',
    url(r'^tasks/$', task_list, name='task-list'),
    url(r'^tasks/(?P<pk>[0-9]+)/$', task_detail, name='task-detail'),
    url(r'^timetable/$', timetable_item_list, name='timetable-item-list'),
    url(r'^timetable/(?P<pk>[0-9]+)/$', timetable_item_detail, name='timetable-item-detail'),
) 

urlpatterns = patterns('',
    url(r'^', include('task_manager.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^timetable/', include('timetable.urls')),
    url(r'^projectOverview/', include('project_overview.urls')),
    url(r'^api/v1/', include(api_patterns)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^accounts/login/$', 'uni_workz.views.login'),
    url(r'^accounts/logout/$', 'uni_workz.views.logout'),
    url(r'^accounts/loggedin/$', 'uni_workz.views.loggedin'),
    url(r'^accounts/error/$', 'uni_workz.views.invalid_login'),
    url(r'^accounts/auth/$', 'uni_workz.views.auth_view'),
)
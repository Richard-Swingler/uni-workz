from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^', include('task_manager.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^timetable/', include('timetable.urls')),
    url(r'^projectOverview/', include('project_overview.urls')),

    url(r'^accounts/login/$', 'uni_workz.views.login'),
    url(r'^accounts/logout/$', 'uni_workz.views.logout'),
    url(r'^accounts/loggedin/$', 'uni_workz.views.loggedin'),
    url(r'^accounts/error/$', 'uni_workz.views.invalid_login'),
    url(r'^accounts/auth/$', 'uni_workz.views.auth_view'),
)
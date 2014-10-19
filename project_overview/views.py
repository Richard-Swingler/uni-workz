from django.shortcuts import render

def index(request):
    return render(request, 'project_overview/projectOverview.html')

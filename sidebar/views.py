from django.shortcuts import render, get_object_or_404
from eventlog.models import Log

def index(request):
    logs = Log.objects.all() [:5]
    return render(request, '../templates/sidebar/index.html', {'logs' : logs })


def getpost(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'blog/getpost.html', {'post' : post})

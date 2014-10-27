from django.db import models
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.template.defaultfilters import slugify
from eventlog.models import log

class Post(models.Model):
    title = models.CharField(max_length=140)
    description = models.CharField(max_length = 140)
    content = models.TextField()
    slug = models.SlugField()
    published = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        if not self.id:
            log(user=self.author, action='Added a Post',
                extra={"title": self.title})
        else:
            log(user=self.author, action='Changed a Post',
                extra={"title": self.title})

        super(Post, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog.views.getpost', args=[self.slug])

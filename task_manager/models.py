from django.db import models
from rest_framework import serializers
from eventlog.models import log
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True)
    author = models.ForeignKey(User, related_name = 'users_author', null=True)
    startDate = models.DateTimeField('start date')
    endDate = models.DateTimeField('end date')
    assignedUser = models.ForeignKey(User, related_name = 'users_assigned', null=True)
    progressFlag = models.SmallIntegerField(default=0)


    def __unicode__(self):
    	return self.name

# Override of save method - when a Task is added or changed in anyway there will be a 'log' created
    def save(self, *args, **kwargs):
        if not self.id:
            # Change self.author to the name of the users currently logged in
            log(user=self.author, action='Added a Task',
                extra={"title": self.name})
        else:
            log(user=self.author, action='Changed a Task',
                extra={"title": self.name})

        super(Task, self).save(*args, **kwargs)

# Override of delete method - log created before a task is deleted
    def delete(self):
        log(user=self.author, action='Deleted a Task',
            extra={"title": self.name})

        super(Task, self).delete()

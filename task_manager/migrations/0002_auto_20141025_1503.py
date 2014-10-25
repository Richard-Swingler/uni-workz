# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='start_date',
        ),
        migrations.AddField(
            model_name='task',
            name='task_start_date',
            field=models.DateTimeField(default=datetime.date(2014, 10, 25)),
            preserve_default=False,
        ),
    ]

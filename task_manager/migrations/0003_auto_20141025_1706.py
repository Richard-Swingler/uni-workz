# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0002_auto_20141025_1503'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='assigned_user',
        ),
        migrations.RemoveField(
            model_name='task',
            name='task_duration',
        ),
        migrations.RemoveField(
            model_name='task',
            name='task_name',
        ),
        migrations.RemoveField(
            model_name='task',
            name='task_start_date',
        ),
    ]

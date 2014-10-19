# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('task_name', models.CharField(max_length=255)),
                ('task_duration', models.IntegerField(verbose_name=b'duration')),
                ('assigned_user', models.CharField(max_length=20)),
                ('start_date', models.DateTimeField(verbose_name=b'start_date')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]

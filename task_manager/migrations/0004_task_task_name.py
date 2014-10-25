# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0003_auto_20141025_1706'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='task_name',
            field=models.CharField(default='null', max_length=255),
            preserve_default=False,
        ),
    ]

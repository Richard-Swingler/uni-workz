# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0004_task_task_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='task_name',
            field=models.TextField(),
        ),
    ]

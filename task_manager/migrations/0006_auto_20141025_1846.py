# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_manager', '0005_auto_20141025_1811'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='task_name',
            new_name='name',
        ),
    ]

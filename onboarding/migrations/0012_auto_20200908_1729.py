# Generated by Django 3.1 on 2020-09-08 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0011_auto_20200908_1304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]

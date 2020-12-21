# Generated by Django 3.1 on 2020-12-16 14:18

from django.db import migrations, models
import onboarding.models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0002_package_users_blank_true'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='about',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='company_logo',
            field=models.ImageField(blank=True, null=True, upload_to=onboarding.models.upload_to),
        ),
        migrations.AddField(
            model_name='company',
            name='info',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='link',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='mission',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='vision',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]

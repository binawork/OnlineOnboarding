# Generated by Django 3.1 on 2020-11-10 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0019_q_and_a_null_true'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='updated_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
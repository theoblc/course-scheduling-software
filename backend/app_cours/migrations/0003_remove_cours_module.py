# Generated by Django 4.1.5 on 2023-03-09 08:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_cours', '0002_cours_module'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cours',
            name='module',
        ),
    ]

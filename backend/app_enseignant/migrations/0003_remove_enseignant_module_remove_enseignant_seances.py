# Generated by Django 4.1.5 on 2023-03-19 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_enseignant', '0002_enseignant_departement'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enseignant',
            name='module',
        ),
        migrations.RemoveField(
            model_name='enseignant',
            name='seances',
        ),
    ]

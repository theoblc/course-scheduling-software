# Generated by Django 4.1.5 on 2023-03-19 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_salle', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='salle',
            name='seances',
        ),
    ]
# Generated by Django 4.1.5 on 2023-04-27 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Salle',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.CharField(max_length=4)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]

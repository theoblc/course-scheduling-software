# Generated by Django 4.1.5 on 2023-03-30 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_seance', '0007_seance_commentaire_seance_effectif'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seance',
            name='commentaire',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='seance',
            name='effectif',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]

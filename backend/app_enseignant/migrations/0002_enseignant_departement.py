# Generated by Django 4.1.5 on 2023-02-15 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_enseignant', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='enseignant',
            name='departement',
            field=models.TextField(choices=[('EPH', 'EPH'), ('Vacataire', 'Vacataire'), ('Autre', 'Autre')], default='EPH'),
        ),
    ]

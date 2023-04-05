# Generated by Django 4.1.5 on 2023-04-05 06:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_enseignant', '0001_initial'),
        ('app_cours', '0002_cours_type'),
        ('app_seance', '0002_alter_seance_effectif'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seance',
            name='cours',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='seance', to='app_cours.cours'),
        ),
        migrations.AlterField(
            model_name='seance',
            name='enseignant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='seance', to='app_enseignant.enseignant'),
        ),
    ]

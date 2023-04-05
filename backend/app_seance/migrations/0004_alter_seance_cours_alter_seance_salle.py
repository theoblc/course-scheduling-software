# Generated by Django 4.1.5 on 2023-04-05 07:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_cours', '0002_cours_type'),
        ('app_salle', '0001_initial'),
        ('app_seance', '0003_alter_seance_cours_alter_seance_enseignant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seance',
            name='cours',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='seance', to='app_cours.cours'),
        ),
        migrations.AlterField(
            model_name='seance',
            name='salle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='seance', to='app_salle.salle'),
        ),
    ]

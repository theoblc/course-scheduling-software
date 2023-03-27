# Generated by Django 4.1.5 on 2023-03-09 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_cours', '0003_remove_cours_module'),
        ('app_module', '0003_remove_module_cours'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='cours',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='module', to='app_cours.cours'),
        ),
    ]

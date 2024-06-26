# Generated by Django 4.1.5 on 2023-04-27 06:44

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app_enseignant', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=7)),
                ('nom', models.CharField(max_length=50)),
                ('nb_heures_total', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_tp', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_td', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_be', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_ci', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_cm', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('nb_heures_hors_presentiel', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('enseignant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='module', to='app_enseignant.enseignant')),
            ],
        ),
    ]

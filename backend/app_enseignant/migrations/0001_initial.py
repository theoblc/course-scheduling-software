# Generated by Django 4.1.5 on 2023-04-02 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Enseignant',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.TextField()),
                ('prenom', models.TextField()),
                ('departement', models.TextField(choices=[('EPH', 'EPH'), ('Vacataire', 'Vacataire'), ('Autre', 'Autre')], default='EPH')),
            ],
        ),
    ]

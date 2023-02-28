from django.db import models
from app_module.models import Module
from app_seance.models import Seance

class Enseignant(models.Model):

   DEPARTEMENT_CHOICES = [("EPH","EPH"), ("Vacataire","Vacataire"), ("Autre","Autre")]

   id = models.AutoField(primary_key=True)
   nom = models.TextField()
   prenom = models.TextField()
   departement = models.TextField(
        choices=DEPARTEMENT_CHOICES,
        default="EPH",
    )
   module = models.ManyToManyField(Module, blank=True)
   seances = models.ManyToManyField(Seance, blank=True)


   def _str_(self):
     return self.nom

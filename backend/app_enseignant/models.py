from django.db import models
from app_module.models import Module
from app_seance.models import Seance

class Enseignant(models.Model):
   id = models.AutoField(primary_key=True)
   nom = models.TextField()
   prenom = models.TextField()
   module = models.ManyToManyField(Module, blank=True)
   seances = models.ManyToManyField(Seance, blank=True)

   def _str_(self):
     return self.nom

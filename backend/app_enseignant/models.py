from django.db import models
from app_module.models import Module
from app_seance.models import Seance

class Enseignant(models.Model):
   nom = models.TextField()
   prenom = models.TextField()
   module = models.ManyToManyField(Module)
   seances = models.ManyToManyField(Seance)

   def _str_(self):
     return self.nom

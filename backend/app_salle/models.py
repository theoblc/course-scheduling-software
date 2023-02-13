from django.db import models
from app_seance.models import Seance

class Salle(models.Model):
   id = models.AutoField(primary_key=True)
   numero = models.CharField(max_length=7)
   seances = models.ManyToManyField(Seance, blank=True)

   def _str_(self):
     return self.numero

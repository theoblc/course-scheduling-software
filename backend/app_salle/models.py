from django.db import models
from app_seance.models import Seance

class Salle(models.Model):
   numero = models.CharField(primary_key=True,max_length=7)
   seances = models.ManyToManyField(Seance)

   def _str_(self):
     return self.numero

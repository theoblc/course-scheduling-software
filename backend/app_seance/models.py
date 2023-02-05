from django.db import models
from app_module.models import Module       

class Seance(models.Model):
   module = models.ForeignKey(Module, on_delete=models.CASCADE)
   date_debut = models.DateTimeField()
   date_fin = models.DateTimeField()
   numero_groupe_td = models.IntegerField()

   def _str_(self):
     return self.module
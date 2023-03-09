from django.db import models
from app_seance.models import Seance
from app_module.models import Module

class Cours(models.Model):
   id = models.AutoField(primary_key=True)
   nom = models.CharField(max_length=50)
   seances = models.ForeignKey(Seance, on_delete=models.CASCADE, null=True, blank=True)
   module = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, related_name='cours')
   nb_heures = models.DecimalField(max_digits=4,decimal_places=1)

   def _str_(self):
     return self.code

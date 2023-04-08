from django.db import models
from app_module.models import Module

class Cours(models.Model):
   
   TYPES_COURS = [("CM","CM"), ("CI","CI"), ("TD","TD"), ("TP","TP"), ("BE","BE"), ("Hors Présentiel","Hors Présentiel")]

   id = models.AutoField(primary_key=True)
   nom = models.CharField(max_length=50)
   module = models.ForeignKey(Module, on_delete=models.SET_NULL, null=True, related_name='cours')
   nb_heures = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_hors_presentiel = models.DecimalField(max_digits=4,decimal_places=1)
   type = models.TextField(choices=TYPES_COURS)

   def _str_(self):
     return self.code

from django.db import models
from django.core.validators import MinValueValidator
from app_module.models import Module

class Cours(models.Model):
   
   TYPES_COURS = [("CM","CM"), ("CI","CI"), ("TD","TD"), ("TP","TP"), ("BE","BE")]

   id = models.AutoField(primary_key=True)
   nom = models.CharField(max_length=50)
   module = models.ForeignKey(Module, on_delete=models.SET_NULL, null=True, related_name='cours')
   nb_heures = models.DecimalField(max_digits=4,decimal_places=1, validators=[MinValueValidator(0)])
   nb_heures_hors_presentiel = models.DecimalField(max_digits=4,decimal_places=1, validators=[MinValueValidator(0)])
   type = models.TextField(choices=TYPES_COURS)

   def _str_(self):
     return self.code

from django.db import models
from django.core.validators import MinValueValidator
from app_module.models import Module

class Cours(models.Model):
   
   TYPES_CHOICES = [("CM","CM"), ("CI","CI"), ("TD","TD"), ("TP","TP"), ("BE","BE")]
   EFFECTIF_CHOICES = [("1/2 Promo","1/2 Promo"), ("Promo complète","Promo complète"), ("Groupe de TP","Groupe de TP"),
                       ("1/2 Groupe de TP","1/2 Groupe de TP"),("Groupe de TD","Groupe de TD"),("1/2 Groupe de TD","1/2 Groupe de TD")
                       ]

   id = models.AutoField(primary_key=True)
   nom = models.CharField(max_length=50)
   module = models.ForeignKey(Module, on_delete=models.SET_NULL, null=True, related_name='cours')
   nb_heures = models.DecimalField(max_digits=4,decimal_places=1, validators=[MinValueValidator(0)])
   nb_heures_hors_presentiel = models.DecimalField(max_digits=4,decimal_places=1, validators=[MinValueValidator(0)])
   type = models.TextField(choices=TYPES_CHOICES)
   effectif = models.TextField(choices=EFFECTIF_CHOICES, null=True)

   def _str_(self):
     return self.code

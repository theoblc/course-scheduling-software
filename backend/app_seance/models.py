from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_salle.models import Salle
from app_cours.models import Cours

class Seance(models.Model):
   
   EFFECTIF_CHOICES = [("1/2 Promo","1/2 Promo"), ("Promo complète","Promo complète"), ("Groupe de TP","Groupe de TP"),
                       ("1/2 Groupe de TP","1/2 Groupe de TP"),("Groupe de TD","Groupe de TD"),("1/2 Groupe de TD","1/2 Groupe de TD")
                       ]

   id = models.AutoField(primary_key=True)
   date = models.CharField(max_length=15)
   heure_debut = models.CharField(max_length=15)
   heure_fin = models.CharField(max_length=15)
   effectif = models.TextField(choices=EFFECTIF_CHOICES, null=True)
   commentaire = models.CharField(max_length=100, blank=True, null=True)
   module = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, related_name='seance')
   cours = models.ForeignKey(Cours, on_delete=models.CASCADE, null=True, related_name='seance')
   enseignant = models.ForeignKey(Enseignant, on_delete=models.SET_NULL, null=True, related_name='seance')
   salle = models.ForeignKey(Salle, on_delete=models.SET_NULL, null=True, related_name='seance')
   numero_groupe_td = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9)],
        null=True
    )

   def _str_(self):
     return self.numero_groupe_td
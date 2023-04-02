from django.db import models
from django.core.exceptions import ValidationError
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_salle.models import Salle
from app_cours.models import Cours

class Seance(models.Model):
   id = models.AutoField(primary_key=True)
   date = models.CharField(max_length=15)
   heure_debut = models.CharField(max_length=15)
   heure_fin = models.CharField(max_length=15)
   effectif = models.CharField(max_length=50, blank=True, null=True)
   commentaire = models.CharField(max_length=100, blank=True, null=True)
   enseignant = models.ForeignKey(Enseignant, on_delete=models.CASCADE, null=True, related_name='seance')
   module = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, related_name='seance')
   cours = models.ForeignKey(Cours, on_delete=models.CASCADE, null=True, related_name='seance')
   salle = models.ForeignKey(Salle, on_delete=models.CASCADE, null=True, related_name='seance')
   numero_groupe_td = models.IntegerField()

   def _str_(self):
     return self.numero_groupe_td
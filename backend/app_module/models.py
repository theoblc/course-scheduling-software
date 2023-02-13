from django.db import models
from app_cours.models import Cours
from app_seance.models import Seance

class Module(models.Model):
   id = models.AutoField(primary_key=True)
   code = models.CharField(max_length=7)
   nom = models.CharField(max_length=50)
   seances = models.ForeignKey(Seance, on_delete=models.CASCADE, null=True, related_name='module', blank=True)
   cours = models.ForeignKey(Cours, on_delete=models.CASCADE, null=True, related_name='module', blank=True)
   nb_heures_total = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_tp = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_be = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_ci = models.DecimalField(max_digits=4,decimal_places=1)

   def _str_(self):
     return self.code

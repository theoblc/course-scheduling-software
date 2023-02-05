from django.db import models
from app_cours.models import Cours
from app_seance.models import Seance

class Module(models.Model):
   code = models.CharField(primary_key=True,max_length=7)
   nom = models.CharField(max_length=50)
   seances = models.ForeignKey(Seance, on_delete=models.CASCADE, null=True, related_name='module')
   cours = models.ForeignKey(Cours, on_delete=models.CASCADE, null=True, related_name='module')
   nb_heures_total = models.IntegerField()
   nb_heures_tp = models.IntegerField()
   nb_heures_be = models.IntegerField()
   nb_heures_ci = models.IntegerField()

   def _str_(self):
     return self.code

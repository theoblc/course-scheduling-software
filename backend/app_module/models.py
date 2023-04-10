from django.db import models
from app_enseignant.models import Enseignant

class Module(models.Model):
   id = models.AutoField(primary_key=True)
   code = models.CharField(max_length=7)
   nom = models.CharField(max_length=50)
   enseignant = models.ForeignKey(Enseignant, on_delete=models.SET_NULL, null=True, related_name='module', to_field='id')
   nb_heures_total = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_tp = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_td = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_be = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_ci = models.DecimalField(max_digits=4,decimal_places=1)
   nb_heures_cm = models.DecimalField(max_digits=4,decimal_places=1)


   def _str_(self):
     return self.code

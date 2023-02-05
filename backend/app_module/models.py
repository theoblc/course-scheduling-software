from django.db import models

class Module(models.Model):
   code = models.CharField(primary_key=True,max_length=7)
   nom = models.CharField(max_length=50)
   nb_heures_total = models.IntegerField()
   nb_heures_tp = models.IntegerField()
   nb_heures_be = models.IntegerField()
   nb_heures_ci = models.IntegerField()

   def _str_(self):
     return self.code

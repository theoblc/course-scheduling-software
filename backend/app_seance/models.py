from django.db import models

class Seance(models.Model):
   id = models.AutoField(primary_key=True)
   date_debut = models.CharField(max_length=50)
   date_fin = models.CharField(max_length=50)
   numero_groupe_td = models.IntegerField()

   def _str_(self):
     return self.numero_groupe_td

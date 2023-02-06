from django.db import models

class Seance(models.Model):
   date_debut = models.DateTimeField()
   date_fin = models.DateTimeField()
   numero_groupe_td = models.IntegerField()

   def _str_(self):
     return self.numero_groupe_td

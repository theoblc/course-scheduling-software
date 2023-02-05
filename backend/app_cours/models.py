from django.db import models

class Cours(models.Model):
   nom = models.CharField(primary_key=True, max_length=50)
   nb_heures = models.IntegerField()

   def _str_(self):
     return self.code

from django.db import models

class Salle(models.Model):
   numero = models.CharField(primary_key=True,max_length=7)

   def _str_(self):
     return self.numero
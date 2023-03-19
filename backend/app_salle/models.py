from django.db import models

class Salle(models.Model):
   id = models.AutoField(primary_key=True)
   numero = models.CharField(max_length=7)

   def _str_(self):
     return self.numero

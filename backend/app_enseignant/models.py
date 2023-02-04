from django.db import models

class Enseignant(models.Model):
   nom = models.TextField()
   prenom = models.TextField()

   def _str_(self):
     return self.nom
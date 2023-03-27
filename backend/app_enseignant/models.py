from django.db import models

class Enseignant(models.Model):

   DEPARTEMENT_CHOICES = [("EPH","EPH"), ("Vacataire","Vacataire"), ("Autre","Autre")]

   id = models.AutoField(primary_key=True)
   nom = models.TextField()
   prenom = models.TextField()
   departement = models.TextField(
        choices=DEPARTEMENT_CHOICES,
        default="EPH",
    )


   def _str_(self):
     return self.nom

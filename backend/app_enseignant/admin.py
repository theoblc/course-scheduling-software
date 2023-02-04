from django.contrib import admin
from .models import Enseignant

class AccueilAdmin(admin.ModelAdmin):
  list = ('nom', 'prenom')

admin.site.register(Enseignant, AccueilAdmin)
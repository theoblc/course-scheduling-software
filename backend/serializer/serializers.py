from rest_framework import serializers
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_seance.models import Seance

class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant   
        fields = ('nom' ,'prenom')

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module   
        fields = ('code' ,'nom','nb_heures_total','nb_heures_tp','nb_heures_be','nb_heures_ci')

class SeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance   
        fields = ('module' ,'date_debut','date_fin','numero_groupe_td')



from rest_framework import serializers
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_seance.models import Seance
from app_salle.models import Salle
from app_cours.models import Cours

class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant   
        fields = ('nom' ,'prenom','module','seances')

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module   
        fields = ('code' ,'nom','seances','cours','nb_heures_total','nb_heures_tp','nb_heures_be','nb_heures_ci')

class SeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance   
        fields = ('module' ,'date_debut','date_fin','numero_groupe_td')

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle   
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours   
        fields = '__all__'

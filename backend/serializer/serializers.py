from rest_framework import serializers
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_seance.models import Seance
from app_salle.models import Salle
from app_cours.models import Cours

class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant   
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module   
        fields = '__all__'

class SeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance   
        fields = '__all__'

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle   
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours   
        fields = '__all__'

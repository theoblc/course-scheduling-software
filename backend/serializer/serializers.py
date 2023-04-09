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
    enseignant = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = '__all__'

    def get_enseignant(self, obj):
        try:
            enseignant = Enseignant.objects.get(id=obj.enseignant.id)
            return EnseignantSerializer(enseignant).data
        except Enseignant.DoesNotExist:
            return None

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle   
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours
        fields = '__all__'

class SeanceSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()
    cours = CoursSerializer()
    enseignant = EnseignantSerializer()
    salle = SalleSerializer()

    class Meta:
        model = Seance
        fields = '__all__'

    def get_enseignant(self, obj):
        try:
            enseignant = Enseignant.objects.get(id=obj.enseignant.id)
            return EnseignantSerializer(enseignant).data
        except Enseignant.DoesNotExist:
            return None
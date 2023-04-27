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
    enseignant = EnseignantSerializer()

    class Meta:
        model = Module
        fields = '__all__'
    
    def create(self, validated_data):
        enseignant_data = self.context['request'].data.get('enseignant')
        enseignant_id = enseignant_data.get('id')
        try:
            enseignant = Enseignant.objects.get(id=enseignant_id)
            validated_data['enseignant'] = enseignant
        except Enseignant.DoesNotExist:
            pass
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        enseignant_data = self.context['request'].data.get('enseignant')
        if enseignant_data:
            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            instance.enseignant = enseignant
            validated_data['enseignant'] = enseignant
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

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
    
    def create(self, validated_data):
        module_data = self.context['request'].data.get('module')
        cours_data = self.context['request'].data.get('cours')
        enseignant_data = self.context['request'].data.get('enseignant')
        salle_data = self.context['request'].data.get('salle')
        try:
            module_id = module_data.get('id')
            module = Module.objects.get(id=module_id)
            validated_data['module'] = module

            cours_id = cours_data.get('id')
            cours = Cours.objects.get(id=cours_id)
            validated_data['cours'] = cours

            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            validated_data['enseignant'] = enseignant

            salle_id = salle_data.get('id')
            salle = Salle.objects.get(id=salle_id)
            validated_data['salle'] = salle
        except Enseignant.DoesNotExist:
            pass
        return super().create(validated_data)

    def update(self, instance, validated_data):
        module_data = self.context['request'].data.get('module')
        cours_data = self.context['request'].data.get('cours')
        enseignant_data = self.context['request'].data.get('enseignant')
        salle_data = self.context['request'].data.get('salle')
        try:
            module_id = module_data.get('id')
            module = Module.objects.get(id=module_id)
            instance.module = module
        
            cours_id = cours_data.get('id')
            cours = Cours.objects.get(id=cours_id)
            instance.cours = cours
        
            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            instance.enseignant = enseignant

            salle_id = salle_data.get('id')
            salle = Salle.objects.get(id=salle_id)
            instance.salle = salle
        except:
            pass
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class SeanceReadSerializer(SeanceSerializer):
     module = ModuleSerializer(read_only=True)
     cours = CoursSerializer(read_only=True)
     enseignant = EnseignantSerializer(read_only=True)
     salle = SalleSerializer(read_only=True)
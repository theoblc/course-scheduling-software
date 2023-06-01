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

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle   
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    coordonnateur1 = EnseignantSerializer()
    coordonnateur2 = EnseignantSerializer(required=False, allow_null=True)

    class Meta:
        model = Module
        fields = '__all__'
    
    def create(self, validated_data):
        coordonnateur1_data = self.context['request'].data.get('coordonnateur1')
        coordonnateur2_data = self.context['request'].data.get('coordonnateur2')
        try:
            coordonnateur1_id = coordonnateur1_data.get('id')
            coordonnateur1 = Enseignant.objects.get(id=coordonnateur1_id)
            validated_data['coordonnateur1'] = coordonnateur1
        except Enseignant.DoesNotExist:
            pass
        if(coordonnateur2_data != None):
            coordonnateur2_id = coordonnateur2_data.get('id')
            coordonnateur2 = Enseignant.objects.get(id=coordonnateur2_id)
            validated_data['coordonnateur2'] = coordonnateur2
        else:
            validated_data['coordonnateur2'] = None
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        coordonnateur1_data = self.context['request'].data.get('coordonnateur1')
        coordonnateur2_data = self.context['request'].data.get('coordonnateur2')

        if coordonnateur1_data:
            coordonnateur1_id = coordonnateur1_data.get('id')
            coordonnateur1 = Enseignant.objects.get(id=coordonnateur1_id)
            instance.coordonnateur1 = coordonnateur1
            validated_data['coordonnateur1'] = coordonnateur1
        if coordonnateur2_data:
            coordonnateur2_id = coordonnateur2_data.get('id')
            coordonnateur2 = Enseignant.objects.get(id=coordonnateur2_id)
            instance.coordonnateur2 = coordonnateur2
            validated_data['coordonnateur2'] = coordonnateur2
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class SeanceSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()
    cours = CoursSerializer()
    enseignant = EnseignantSerializer(required=False, allow_null=True)
    salle = SalleSerializer(required=False, allow_null=True)

    class Meta:
        model = Seance
        fields = '__all__'
    
    def create(self, validated_data):
        module_data = self.context['request'].data.get('module')
        cours_data = self.context['request'].data.get('cours')
        enseignant_data = self.context['request'].data.get('enseignant')
        salle_data = self.context['request'].data.get('salle')

        module_id = module_data.get('id')
        module = Module.objects.get(id=module_id)
        validated_data['module'] = module

        cours_id = cours_data.get('id')
        cours = Cours.objects.get(id=cours_id)
        validated_data['cours'] = cours

        if (enseignant_data != None):
            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            validated_data['enseignant'] = enseignant
        else:
            validated_data['enseignant'] = None

        if (salle_data != None):
            salle_id = salle_data.get('id')
            salle = Salle.objects.get(id=salle_id)
            validated_data['salle'] = salle
        else:
            validated_data['salle'] = None

        return super().create(validated_data)

    def create_without_register(self, validated_data):
        module_data = self.context['request'].data.get('module')
        cours_data = self.context['request'].data.get('cours')
        enseignant_data = self.context['request'].data.get('enseignant')
        salle_data = self.context['request'].data.get('salle')

        module_id = module_data.get('id')
        module = Module.objects.get(id=module_id)
        validated_data['module'] = module

        cours_id = cours_data.get('id')
        cours = Cours.objects.get(id=cours_id)
        validated_data['cours'] = cours

        if (enseignant_data != None):
            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            validated_data['enseignant'] = enseignant
        else:
            validated_data['enseignant'] = None

        if (salle_data != None):
            salle_id = salle_data.get('id')
            salle = Salle.objects.get(id=salle_id)
            validated_data['salle'] = salle
        else:
            validated_data['salle'] = None

        seance = Seance(**validated_data)  # Création de l'objet Seance
        return seance
    
    def update(self, instance, validated_data):
        module_data = self.context['request'].data.get('module')
        cours_data = self.context['request'].data.get('cours')
        enseignant_data = self.context['request'].data.get('enseignant')
        salle_data = self.context['request'].data.get('salle')
        try:
            module_id = module_data.get('id')
            module = Module.objects.get(id=module_id)
            instance.module = module
            validated_data['module'] = module
        
            cours_id = cours_data.get('id')
            cours = Cours.objects.get(id=cours_id)
            instance.cours = cours
            validated_data['cours'] = cours
        
            enseignant_id = enseignant_data.get('id')
            enseignant = Enseignant.objects.get(id=enseignant_id)
            instance.enseignant = enseignant
            validated_data['enseignant'] = enseignant

            salle_id = salle_data.get('id')
            salle = Salle.objects.get(id=salle_id)
            instance.salle = salle
            validated_data['salle'] = salle
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
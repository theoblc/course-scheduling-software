from serializer.serializers import SeanceSerializer
from rest_framework import viewsets      
from .models import Seance          
from rest_framework import generics
from rest_framework.response import Response    
from rest_framework import status   
from rest_framework.permissions import AllowAny
from django.http import JsonResponse

class SeanceView(viewsets.ModelViewSet):  
    serializer_class = SeanceSerializer   
    queryset = Seance.objects.all()

def conflit_salle(new_seance):
    conflits = []
    if (new_seance.salle is None):
        return conflits
    # récupérer toutes les séances
    seances = Seance.objects.all()
    for seance in seances:
        # on vérifie que les deux séances ne sont pas identiques
        if new_seance.pk != seance.pk:
            # si les deux séances ont lieu dans la même salle et ne sont pas identiques
            if new_seance.salle == seance.salle:
                # vérifier si les dates sont identiques
                if (new_seance.date == seance.date):
                    # vérifier si les heures se chevauchent
                    if ((new_seance.heure_debut < seance.heure_fin) and (seance.heure_debut < new_seance.heure_fin)):
                        conflits.append(seance)
    return conflits

def conflit_enseignant(new_seance):
    conflits = []
    if (new_seance.enseignant is None):
        return conflits
    # récupérer toutes les séances
    seances = Seance.objects.all()
    for seance in seances:
        # on vérifie que les deux séances ne sont pas identiques
        if new_seance.pk != seance.pk:
            # si les deux séances ont lieu avec le même enseignant et ne sont pas identiques
            if new_seance.enseignant == seance.enseignant:
                # vérifier si les dates sont identiques
                if (new_seance.date == seance.date):
                    # vérifier si les heures se chevauchent
                    if ((new_seance.heure_debut < seance.heure_fin) and (seance.heure_debut < new_seance.heure_fin)):
                        conflits.append(seance)
    return conflits

class Conflits(generics.ListAPIView):
    serializer_class = SeanceSerializer
    # Ajout de la permission pour tous les utilisateurs
    permission_classes = [AllowAny] 

    # Gestion des conflits via le formulaire
    def post(self, request):
        # Si la séance a pour id 0, cela signifie que c'est une création de séance et non pas une modification
        pk_seance = request.data['id']
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            new_seance = serializer.create_without_register(serializer.validated_data)
            # On recopie le pk pour pouvoir identifier si la séance existe déjà dans la BDD ou non 
            # et ainsi ne pas la comparer avec elle-même
            new_seance.pk = pk_seance
            res_conflit_salle = conflit_salle(new_seance)
            res_conflit_enseignant = conflit_enseignant(new_seance)
            res_conflit_salle_json = []
            res_conflit_enseignant_json = []
            is_conflit = False
            
            if res_conflit_salle != []:
                is_conflit=True
                for conflit in res_conflit_salle:
                    serializer = SeanceSerializer(conflit)
                    new_conflit = serializer.data
                    new_conflit['type_conflit'] = 'Conflit salle'
                    res_conflit_salle_json.append(new_conflit)

            if res_conflit_enseignant != []:
                is_conflit=True
                for conflit in res_conflit_enseignant:
                    serializer = SeanceSerializer(conflit)
                    new_conflit = serializer.data
                    new_conflit['type_conflit'] = 'Conflit enseignant'
                    res_conflit_enseignant_json.append(new_conflit)
            
            # On concatène les listes
            res_conflit_salle_json.extend(res_conflit_enseignant_json)
            return JsonResponse(
            {'conflit': is_conflit, 'liste': res_conflit_salle_json},
            status=status.HTTP_200_OK
        )
        else:
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
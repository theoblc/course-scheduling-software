from serializer.serializers import SeanceSerializer
from rest_framework import viewsets      
from .models import Seance          
import json
from django.http import HttpResponse  
from rest_framework import generics
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response    
from rest_framework import status   
from django.db.models import Q
from rest_framework.permissions import AllowAny

from app_salle.models import Salle
from app_enseignant.models import Enseignant
from app_module.models import Module
from app_cours.models import Cours

class SeanceView(viewsets.ModelViewSet):  
    serializer_class = SeanceSerializer   
    queryset = Seance.objects.all()

def conflit_salle(seance):
    conflits = set()

    # récupérer toutes les séances
    seances = Seance.objects.all()
    
    for seance2 in seances:

        # si les deux séances ont lieu dans la même salle et ne sont pas identiques
        if seance.salle == seance2.salle and seance.pk != seance2.pk:

            # vérifier si les heures se chevauchent
            if (seance.heure_debut < seance2.heure_fin and seance2.heure_debut < seance.heure_fin):
                conflit = tuple(sorted([seance.pk, seance2.pk])) # trier la paire pour éviter les doublons inversés
                conflits.add(conflit)

    # convertir l'ensemble en une liste pour la compatibilité avec le code existant
    return list(conflits)

def detecter_conflits_salles():
    conflits = set()

    # récupérer toutes les séances
    seances = Seance.objects.all()

    # itérer sur chaque séance
    for seance1 in seances:
        conflit = conflit_salle(seance1)
        if conflit:
            conflit = tuple(sorted(conflit))
            # vérifier si la paire de conflits est déjà dans l'ensemble
            conflits.add(conflit)
    
    # convertir l'ensemble en une liste pour la compatibilité avec le code existant
    conflits = list(conflits)
    # on aplatit la liste
    conflits = [item for sublist in conflits for item in sublist]
    # supprimer les doublons
    conflits = sorted(list(set(conflits)))
    
    return conflits

class Conflits(generics.ListAPIView):
    serializer_class = SeanceSerializer
    # Ajout de la permission pour tous les utilisateurs
    permission_classes = [AllowAny] 
    
    # Calcul de tous les conflits
    def get(self, request):
        chevauchements = detecter_conflits_salles()
        # Créer un dictionnaire de réponse JSON
        response_data = {}
        response_data['nb_chevauchements'] = len(chevauchements)
        response_data['chevauchements'] = chevauchements

        # Convertir le dictionnaire en chaîne JSON
        json_response = json.dumps(response_data)

        # Retourner la réponse HTTP avec la chaîne JSON
        return Response(json_response, status=status.HTTP_200_OK)
    
    
    # Gestion des conflits via le formulaire
    def post(self, request):
        if not request.content_type == 'application/json':
            return Response({'error': 'Le type de données doit être JSON.'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        
        data = request.data
        id_seance = data.get('id') #Si c'est une modification ce champs est non vide
        date = data.get('date')
        heure_debut = data.get('heure_debut')
        heure_fin = data.get('heure_fin')
        effectif = data.get("effectif")
        commentaire = data.get("commentaire")
        module_id = data.get('module')
        cours_id = data.get("cours")
        enseignant_id = data.get("enseignant")
        salle_id = data.get('salle')
        numero_groupe_td = data.get('numero_groupe_td')

        # Récupérer l'instance de l'objet correspondant à l'identifiant et renvoyer 
        # une erreur 404 si l'objet n'est pas trouvé
        salle = get_object_or_404(Salle, id=salle_id)
        module = get_object_or_404(Module, id=module_id)
        cours = get_object_or_404(Cours, id=cours_id)
        enseignant = get_object_or_404(Enseignant, id=enseignant_id)
        
        # Vérifier s'il y a une séance qui utilise la même salle et qui se chevauche dans le temps
        if id_seance :
            seances_en_conflit_salle = Seance.objects.filter(
            Q(date=date) & Q(salle=salle) &
            ((Q(heure_debut__lt=heure_fin) & Q(heure_fin__gt=heure_debut)) | 
            (Q(heure_debut__gte=heure_debut) & Q(heure_fin__lte=heure_fin)) |
            (Q(heure_debut__lte=heure_debut) & Q(heure_fin__gt=heure_debut) & ~Q(id=id_seance)) |
            (Q(heure_debut__lt=heure_fin) & Q(heure_fin__gte=heure_fin) & ~Q(id=id_seance)))
            ).exclude(id=id_seance)
            
            seances_en_conflit_enseignant = Seance.objects.filter(
            Q(date=date) & Q(enseignant=enseignant) &
            ((Q(heure_debut__lt=heure_fin) & Q(heure_fin__gt=heure_debut)) | 
            (Q(heure_debut__gte=heure_debut) & Q(heure_fin__lte=heure_fin)) |
            (Q(heure_debut__lte=heure_debut) & Q(heure_fin__gt=heure_debut) & ~Q(id=id_seance)) |
            (Q(heure_debut__lt=heure_fin) & Q(heure_fin__gte=heure_fin) & ~Q(id=id_seance)))
            ).exclude(id=id_seance)
        else:
            seances_en_conflit_salle = Seance.objects.filter(
            Q(date=date) & Q(salle=salle) &
            ((Q(heure_debut__lt=heure_fin) & Q(heure_fin__gt=heure_debut)) | 
            (Q(heure_debut__gte=heure_debut) & Q(heure_fin__lte=heure_fin)) |
            (Q(heure_debut__lte=heure_debut) & Q(heure_fin__gte=heure_fin)))
            )
            seances_en_conflit_enseignant = Seance.objects.filter(
            Q(date=date) & Q(enseignant=enseignant) &
            ((Q(heure_debut__lt=heure_fin) & Q(heure_fin__gt=heure_debut)) | 
            (Q(heure_debut__gte=heure_debut) & Q(heure_fin__lte=heure_fin)) |
            (Q(heure_debut__lte=heure_debut) & Q(heure_fin__gte=heure_fin)))
            )

        # Si la vérification des chevauchements échoue, renvoyer une réponse HTTP avec un message d'erreur approprié
        if (seances_en_conflit_salle.exists() and seances_en_conflit_enseignant.exists()):
            error_message = "Salle et enseignant sont déjà utilisés pour une autre séance."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if seances_en_conflit_salle.exists():
                error_message = "Cette salle est déjà utilisée pour une autre séance."
                return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
            if seances_en_conflit_enseignant.exists():
                error_message = "L'enseignant est déjà occupé pour une autre séance."
                return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        
        if id_seance :
            # Si c'est une modification (<=> si id_seance est non vide)
            new_Seance = Seance.objects.get(id=id_seance)
            new_Seance.date = date
            new_Seance.heure_debut = heure_debut
            new_Seance.heure_fin = heure_fin
            new_Seance.effectif = effectif
            new_Seance.commentaire = commentaire
            new_Seance.module = module
            new_Seance.cours = cours
            new_Seance.enseignant = enseignant
            new_Seance.salle = salle
            new_Seance.numero_groupe_td = numero_groupe_td
        else:       
            # Si la vérification des chevauchements est OK, créer une nouvelle instance de la classe Seance et sauvegarder dans la base de données
            new_Seance = Seance(
                date=date, 
                heure_debut=heure_debut, 
                heure_fin=heure_fin, 
                effectif=effectif, 
                commentaire=commentaire,
                module=module,
                cours=cours,
                enseignant=enseignant,
                salle=salle,
                numero_groupe_td=numero_groupe_td
                )
        new_Seance.save()

        # Renvoyer une réponse HTTP avec les informations de la nouvelle séance créée
        response_data = {'success': True, 'Seance_id': new_Seance.id, 'date': date, 'heure_debut': heure_debut, 'heure_fin': heure_fin, 'salle': salle_id}
        return Response(response_data, status=status.HTTP_201_CREATED)
    
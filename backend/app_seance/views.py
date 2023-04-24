from serializer.serializers import SeanceSerializer
from rest_framework import viewsets      
from .models import Seance          
import json
from django.http import HttpResponse  

from rest_framework.views import APIView
from rest_framework.response import Response    
from rest_framework import status
from rest_framework import viewsets      
from django.db.models import Q
from django.http import JsonResponse

from app_salle.models import Salle
from app_enseignant.models import Enseignant
from serializer.serializers import SalleSerializer
from serializer.serializers import EnseignantSerializer

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
        if (conflit != []):
            conflits.add(tuple(sorted(conflit_salle(seance1))))
    # convertir l'ensemble en une liste pour la compatibilité avec le code existant    
    conflits = list(conflits)
    # on aplatit la liste
    flattened_list = [item for sublist in conflits for item in sublist]
    
    return flattened_list

def envoyer_conflits(request):
    chevauchements = detecter_conflits_salles()
    # Créer un dictionnaire de réponse JSON
    response_data = {}
    response_data['nb_chevauchements'] = len(chevauchements)
    response_data['chevauchements'] = chevauchements

    # Convertir le dictionnaire en chaîne JSON
    json_response = json.dumps(response_data)

    # Retourner la réponse HTTP avec la chaîne JSON
    return HttpResponse(json_response, content_type='application/json')

def conflit_creation_salle(request):
    date = request.POST.get('date')
    heure_debut = request.POST.get('heure_debut')
    heure_fin = request.POST.get('heure_fin')
    salle = request.POST.get('salle')
    numero_groupe_td = request.POST.get('numero_groupe_td')

    # Vérifier s'il y a une séance qui utilise la même salle et qui se chevauche dans le temps
    seances_en_conflit = Seance.objects.filter(
        Q(date=date) & Q(salle=salle) &
        ((Q(heure_debut__lt=heure_fin) & Q(heure_fin__gt=heure_debut)) | 
        (Q(heure_debut__gte=heure_debut) & Q(heure_fin__lte=heure_fin)) |
        (Q(heure_debut__lte=heure_debut) & Q(heure_fin__gte=heure_fin)))
    )

    # Si la vérification des chevauchements échoue, renvoyer une réponse HTTP avec un message d'erreur approprié
    if seances_en_conflit.exists():
        error_message = "Cette salle est déjà utilisée pour une autre séance à ce moment-là."
        return JsonResponse({'error': error_message})

    # Si la vérification des chevauchements est OK, créer une nouvelle instance de la classe Seance et sauvegarder dans la base de données
    new_Seance = Seance(date=date, heure_debut=heure_debut, heure_fin=heure_fin, salle=salle)
    new_Seance.save()

    # Renvoyer une réponse HTTP avec les informations de la nouvelle séance créée
    response_data = {'success': True, 'Seance_id': new_Seance.id, 'date': date, 'heure_debut': heure_debut, 'heure_fin': heure_fin, 'salle': salle, 'numero_groupe_td': numero_groupe_td}
    return JsonResponse(response_data)

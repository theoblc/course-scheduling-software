from django.shortcuts import render
from serializer.serializers import EnseignantSerializer 
from rest_framework import viewsets      
from .models import Enseignant                 

class EnseignantView(viewsets.ModelViewSet):  
    serializer_class = EnseignantSerializer   
    queryset = Enseignant.objects.all()

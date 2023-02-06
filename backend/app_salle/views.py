from django.shortcuts import render
from serializer.serializers import SalleSerializer 
from rest_framework import viewsets      
from .models import Salle                 

class SalleView(viewsets.ModelViewSet):  
    serializer_class = SalleSerializer   
    queryset = Salle.objects.all()

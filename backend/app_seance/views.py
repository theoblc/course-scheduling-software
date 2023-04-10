from django.shortcuts import render
from serializer.serializers import SeanceSerializer, SeanceReadSerializer
from rest_framework import viewsets      
from .models import Seance                 

class SeanceView(viewsets.ModelViewSet):  
    serializer_class = SeanceSerializer   
    queryset = Seance.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return SeanceReadSerializer
        return SeanceSerializer

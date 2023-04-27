from serializer.serializers import SeanceSerializer
from rest_framework import viewsets      
from .models import Seance                 

class SeanceView(viewsets.ModelViewSet):  
    serializer_class = SeanceSerializer   
    queryset = Seance.objects.all()


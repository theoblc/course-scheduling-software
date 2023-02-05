from django.shortcuts import render
from serializer.serializers import CoursSerializer 
from rest_framework import viewsets      
from .models import Cours                 

class CoursView(viewsets.ModelViewSet):  
    serializer_class = CoursSerializer   
    queryset = Cours.objects.all()     
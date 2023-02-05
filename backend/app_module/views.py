from django.shortcuts import render
from serializer.serializers import ModuleSerializer 
from rest_framework import viewsets      
from .models import Module                 

class ModuleView(viewsets.ModelViewSet):  
    serializer_class = ModuleSerializer   
    queryset = Module.objects.all()     
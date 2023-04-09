from django.shortcuts import render
from rest_framework.views import APIView
from serializer.serializers import ModuleSerializer
from serializer.serializers import CoursSerializer
from serializer.serializers import SeanceSerializer
from serializer.serializers import EnseignantSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets      
from .models import Module
from app_cours.models import Cours
from app_seance.models import Seance
from app_enseignant.models import Enseignant

class ModuleView(viewsets.ModelViewSet):  
    serializer_class = ModuleSerializer   
    queryset = Module.objects.all()

class ListeCoursModule(APIView):
    def get(self, request, module_id):
        try:
            module = Module.objects.get(id=module_id)
            cours = Cours.objects.filter(module=module)
            serializer = CoursSerializer(cours, many=True)
            return Response(serializer.data)
        except Module.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, module_id):
        serializer = CoursSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(module_id=module_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListeSeancesModule(APIView):
    def get(self, request, module_id):
        try:
            module = Module.objects.get(id=module_id)
            seances = Seance.objects.filter(module=module)
            serializer = SeanceSerializer(seances, many=True)
            return Response(serializer.data)
        except Module.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, module_id):
        serializer = SeanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(module_id=module_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
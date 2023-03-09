from django.shortcuts import render
from rest_framework.views import APIView
from serializer.serializers import ModuleSerializer 
from serializer.serializers import CoursSerializer 
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets      
from .models import Module
from app_cours.models import Cours

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
from django.shortcuts import render
from rest_framework.views import APIView
from serializer.serializers import CoursSerializer
from serializer.serializers import SeanceSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets      
from app_cours.models import Cours
from app_seance.models import Seance

class CoursView(viewsets.ModelViewSet):  
    serializer_class = CoursSerializer   
    queryset = Cours.objects.all()     

class ListeSeancesCours(APIView):
    def get(self, request, cours_id):
        try:
            cours = Cours.objects.get(id=cours_id)
            seances = Seance.objects.filter(cours=cours)
            serializer = SeanceSerializer(seances, many=True)
            return Response(serializer.data)
        except Cours.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, cours_id):
        serializer = SeanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cours_id=cours_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
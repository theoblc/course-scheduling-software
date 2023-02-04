from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from app_enseignant import views     

router = routers.DefaultRouter()                   
router.register(r'enseignants', views.EnseignantView, 'enseignant')  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))             
]
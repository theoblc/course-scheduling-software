from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from app_enseignant import views as enseignant_views     
from app_module import views as module_views  

router = routers.DefaultRouter()                   
router.register(r'enseignants', enseignant_views.EnseignantView, 'enseignant')  
router.register(r'modules', module_views.ModuleView, 'module')  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))             
]
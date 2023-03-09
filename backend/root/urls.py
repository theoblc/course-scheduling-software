from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from app_enseignant import views as enseignant_views 
from app_module import views as module_views
from app_seance import views as seance_views
from app_salle import views as salle_views
from app_cours import views as cours_views

router = routers.DefaultRouter()                   
router.register(r'enseignants', enseignant_views.EnseignantView, 'enseignant')
router.register(r'modules', module_views.ModuleView, 'module')
router.register(r'seances', seance_views.SeanceView, 'seance')
router.register(r'salles', salle_views.SalleView, 'salle')
router.register(r'cours', cours_views.CoursView, 'cours')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/module/<int:module_id>/cours/', module_views.ListeCoursModule.as_view(), name='liste_cours_module'),
]
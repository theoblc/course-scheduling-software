from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('app_accueil.urls')),
    path('admin/', admin.site.urls),
]
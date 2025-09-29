"""
URL configuration for echomind project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from audio.api import viewsets as audioviewset
from usuarios.api.viewsets import RegisterView, LoginView
from audio.views import FileUploadView

route = routers.DefaultRouter()
route.register(r'audio', audioviewset.AudioViewSet, basename='Audio')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("api/uploads/", FileUploadView.as_view(), name="file-upload"),
]
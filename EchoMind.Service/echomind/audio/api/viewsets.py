from rest_framework import viewsets
from audio.api import serializers
from audio import models

class AudioViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AudioSerializer
    queryset = models.Audio.objects.all()
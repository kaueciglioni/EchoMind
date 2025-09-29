from rest_framework import serializers
from audio.models import Audio

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = "__all__"
        read_only_fields = ["guid", "uploaded_at", "user"]

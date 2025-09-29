from django.db import models
from uuid import uuid4

class Audio(models.Model):
    guid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    filename = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    transcription = models.TextField(blank=True, null=True)
    localpath = models.CharField(max_length=512, blank=True, null=True)
    resume = models.TextField(blank=True, null=True)
    processed = models.BooleanField(default=False)
    user = models.ForeignKey('auth.User', related_name='audios', on_delete=models.CASCADE, null=True, blank=True)
from rest_framework import generics, permissions
from audio.models import Audio
from audio.api.serializers import AudioSerializer

class FileUploadView(generics.ListCreateAPIView):
    serializer_class = AudioSerializer
    # Sem bloquear o envio de arquivos
    permission_classes = []  # ou deixe vazio para usar AllowAny do settings

    def get_queryset(self):
        # Lista de arquivos só para usuários logados
        if self.request.user.is_authenticated:
            return Audio.objects.filter(user=self.request.user)
        # Usuário não logado não vê nada
        return Audio.objects.none()

    def perform_create(self, serializer):
        # Associa o user apenas se estiver logado
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()  # permite salvar sem user

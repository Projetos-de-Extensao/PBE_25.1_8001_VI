# Create your views here.
from rest_framework import viewsets
from .models import Cliente,Pedido,Loja, Avaliacao
from .serializers import ClienteSerializer, PedidoSerializer, LojaSerializer, Avaliacaoserializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

#criando as views do cliente e pedido

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)
        
        
class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)

class LojaViewSet(viewsets.ModelViewSet):
    queryset = Loja.objects.all()
    serializer_class = LojaSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)

class AvaliacaoSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.all()
    serializer_class = Avaliacaoserializer
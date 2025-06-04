# Create your views here.
from rest_framework import viewsets
from .models import Cliente,Produto,Motorista,Pedido
from .serializers import ClienteSerializer, ProdutoSerializer, MotoristaSerializer, PedidoSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

#criando as views do cliente e produto

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class MotoristaViewSet(viewsets.ModelViewSet):
    queryset = Motorista.objects.all()
    serializer_class = MotoristaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer


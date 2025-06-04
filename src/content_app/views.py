# Create your views here.
from rest_framework import viewsets
from .models import Cliente,Produto,Motorista,Pedido
from .serializers import ClienteSerializer, ProdutoSerializer, MotoristaSerializer, PedidoSerializer
from rest_framework.permissions import IsAuthenticated

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
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()
    
    def get_queryset(self):
        user_logado = self.request.user
        # Se o usuário for admin, pode ver todos ou filtrar
        if user_logado.is_staff:
            return Pedido.objects.all().order_by('data_de_criacao')
        else:
            return Pedido.objects.filter(cliente=user_logado).order_by('data_de_criacao')
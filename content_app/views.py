# Create your views here.
from rest_framework import viewsets
from .models import Cliente,Pedido
from .serializers import ClienteSerializer, PedidoSerializer
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

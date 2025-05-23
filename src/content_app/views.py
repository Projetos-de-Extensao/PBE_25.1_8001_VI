# Create your views here.
from rest_framework import viewsets
from .models import Cliente,Produto,Loja
from .serializers import ClienteSerializer, ProdutoSerializer, LojaSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

#criando as views do cliente e produto

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)

class LojaViewSet(viewsets.ModelViewSet):
    queryset = Loja.objects.all()
    serializer_class = LojaSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)
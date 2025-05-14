from rest_framework import serializers
from .models import Cliente,Pedido,Loja, Avaliacao

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
        
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loja
        fields = '__all__'

class Avaliacaoserializer (serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = '__all__'
from rest_framework import serializers
from .models import Cliente,Produto,Loja

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loja
        fields = '__all__'
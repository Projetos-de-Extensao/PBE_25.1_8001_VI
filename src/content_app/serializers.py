from rest_framework import serializers
from .models import Cliente,Motorista,Pedido
from django.contrib.auth.models import User
from django.db import transaction  # Importa o gerenciador de transações


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class MotoristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motorista
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
        read_only_fields = ('cliente', 'data_de_criacao', 'ultima_atualizacao', 'status')

class CadastroClienteSerializer(serializers.ModelSerializer):
    # Adicionamos um campo para a senha que só será usado para escrita (não será retornado na resposta)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    nome = serializers.CharField(required=True)

    class Meta:
        model = Cliente
        # Campos que esperamos receber do frontend para criar o Cliente e o User
        fields = ('nome', 'cpf', 'data_nascimento', 'email', 'password')

    def validate_cpf(self, value):
        """
        Verificação final para garantir que o CPF não está em uso.
        Esta é a validação de segurança no lado do servidor.
        """
        # Limpa o CPF para ter apenas dígitos
        cpf_limpo = ''.join(filter(str.isdigit, value))
        if Cliente.objects.filter(cpf=cpf_limpo).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado no sistema.")
        return cpf_limpo # Retorna o CPF limpo para ser salvo

    def validate_email(self, value):
        """
        Verifica se o email já está sendo usado por outro User.
        """
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este endereço de email já está em uso.")
        return value

    def create(self, validated_data):
        """
        Sobrescreve o método create para lidar com a criação dos dois modelos (User e Cliente).
        """
        # Usamos transaction.atomic para garantir que ambas as criações (User e Cliente)
        # aconteçam com sucesso. Se uma falhar, a outra é desfeita (rollback).
        try:
            with transaction.atomic():
                # 1. Cria o objeto User do Django
                # Usamos o email como username, uma prática comum.
                user = User.objects.create_user(
                    username=validated_data['email'],
                    email=validated_data['email'],
                    password=validated_data['password']
                )

                # 2. Cria o objeto Cliente associado
                # O **validated_data remove a senha para não dar erro ao criar o Cliente
                cliente = Cliente.objects.create(
                    user=user,
                    nome=validated_data['nome'],
                    cpf=validated_data['cpf'],
                    data_nascimento=validated_data['data_nascimento'],
                    email=validated_data['email'] # Salva o email também no perfil Cliente
                )
                return cliente
        except Exception as e:
            # Em caso de qualquer erro inesperado, levanta um erro de validação
            raise serializers.ValidationError(f"Ocorreu um erro durante o cadastro: {e}")

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente,Produto,Motorista,Pedido
from .serializers import ClienteSerializer, ProdutoSerializer, MotoristaSerializer, PedidoSerializer, CadastroClienteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny

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
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user_logado = self.request.user
        # Se o usuário for admin, pode ver todos ou filtrar
        if user_logado.is_staff:
            return Pedido.objects.all().order_by('data_de_criacao')
        else:
            return Pedido.objects.filter(cliente=user_logado).order_by('data_de_criacao')
    
    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)

        
@api_view(['GET'])
@permission_classes([AllowAny])
def verificar_cpf(request):
    """
    Verifica se um CPF já está cadastrado no sistema.
    Espera um parâmetro de query 'cpf', ex: /api/verificar-cpf/?cpf=12345678900
    """
    cpf_param = request.query_params.get('cpf', None)

    if not cpf_param:
        return Response(
            {'error': 'Parâmetro CPF não fornecido.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Limpa o CPF para ter apenas dígitos (caso venha com pontos/traços)
    cpf_limpo = ''.join(filter(str.isdigit, cpf_param))

    if len(cpf_limpo) != 11:
        return Response(
            {'error': 'CPF deve conter 11 dígitos.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # query que verifica se existe um Cliente com este CPF
    cpf_existe = Cliente.objects.filter(cpf=cpf_limpo).exists()

    # Retorna uma resposta JSON simples que o frontend pode usar
    return Response({'cpf_cadastrado': cpf_existe})

# --- NOVA VIEW PARA O CADASTRO ---
@api_view(['POST'])
@permission_classes([AllowAny]) # Qualquer um pode tentar se cadastrar
def cadastrar_cliente_view(request):
    """
    Cria um novo User e um novo Cliente no sistema.
    Recebe uma requisição POST com nome, cpf, data_nascimento, email e password.
    """
    serializer = CadastroClienteSerializer(data=request.data)

    # O método is_valid() irá executar os métodos validate_cpf e validate_email
    if serializer.is_valid():
        # O método save() irá executar o nosso método create customizado
        cliente = serializer.save()
        
        # Você pode retornar alguns dados do cliente criado se quiser
        # Mas por segurança, não retorne a senha.
        return Response(
            {
                "message": "Usuário cadastrado com sucesso!",
                "cliente_id": cliente.id,
                "user_id": cliente.user.id,
                "email": cliente.email
            },
            status=status.HTTP_201_CREATED
        )
    
    # Se a validação falhar, o DRF retorna automaticamente os erros
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

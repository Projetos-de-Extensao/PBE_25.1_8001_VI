from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Content(models.Model):
    CONTENT_TYPES = [
        ('audio', 'Áudio'),
        ('video', 'Vídeo'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    file_url = models.URLField()
    thumbnail_url = models.URLField(blank=True, null=True)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
    upload_date = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    is_public = models.BooleanField(default=True)
    status = models.CharField(max_length=20, default='published')
    creator = models.ForeignKey(User, related_name='contents', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=6, decimal_places=2)
    descricao = models.TextField()


    def __str__(self):
        return self.nome

class Motorista(models.Model):
    nome = models.CharField(max_length=100)
    cpf_motorista = models.CharField(max_length=11, unique= True)
    data_nascimento_motorista = models.DateField()
    veiculo = models.CharField(max_length=30)
    telefone = models.CharField(max_length=9)
    email = models.CharField(max_length=30)
    cnh = models.CharField(max_length=11, unique= True)
    numero_registro = models.CharField(max_length=11, unique= True)
    senha_motorista = models.CharField(max_length=30)


    def __str__(self):
        return self.nome

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    premium = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

class Pedido(models.Model):
    descricao = models.TextField(blank=True, null=True)  # Descrição do pedido
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='pedidos')  # Quem fez o pedido
    produtos = models.ManyToManyField(Content, related_name='pedido')  # Produtos incluídos no pedido
    preco = models.DecimalField(max_digits=6, decimal_places=2) #somatório do preço dos pedidos
    data_de_criacao = models.DateTimeField(auto_now_add=True)  # Data de criação
    ultima_atualizacao = models.DateTimeField(auto_now=True)  # Data de última atualização
    status = models.CharField(max_length=20, default='Em processo') # O status do pedido
    motorista = models.ForeignKey(Motorista, related_name='pedidos_entregues', on_delete=models.CASCADE)

    class Meta:
        ordering = ['data_de_criacao']
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return self.cliente




class Loja(models.Model):
    nome = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=9)
    email = models.CharField(max_length=30)
    avaliacao = models.FloatField(max_length=2)
    rua = models.CharField(max_length=255)
    cep = models.CharField(max_length=10)
    numero = models.CharField(max_length=10)
    barro = models.CharField(max_length=10)

    def __str__(self):
        return self.nome

class Pagamento(models.Model):
    valor = models.DecimalField(max_digits=6, decimal_places=2)
    data_pagamento = models.DateTimeField(default=timezone.now)
    metodo_pagamento = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default='Pendente')
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='pagamento')

    def  __str__(self):
            return f'Pagamento #{self.id} - R$ {self.valor}'

class Avaliacao(models.Model):
    nome_cliente = models.CharField(max_length=100)
    nome_loja = models.CharField(max_length=100)
    nota = models.FloatField(max_length=2)
    comentario = models.CharField(max_length=255)

    def __str__(self):
        return self.nota
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    premium = models.BooleanField(default=False)
    email = models.CharField(max_length=30)

    def __str__(self):
        return self.nome

class Pedido(models.Model):
    STATUS_PEDIDO_CHOICES = [
        ('em_analise', 'Em Análise'),
        ('confirmado', 'Pedido Confirmado'),
        ('pago', 'Pago')#status possiveis
    ]
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pedidos')  # Quem fez o pedido
    preco = models.DecimalField(max_digits=6, decimal_places=2) #somatório do preço dos pedidos
    data_de_criacao = models.DateTimeField(auto_now_add=True)  # Data de criação
    ultima_atualizacao = models.DateTimeField(auto_now=True)  # Data de última atualização
    status = models.CharField(max_length=20,choices= STATUS_PEDIDO_CHOICES ,default='em_analise') # O status do pedido
    motorista = models.ForeignKey(Motorista, related_name='pedidos_entregues', on_delete=models.CASCADE, null=True, blank=True)# Motoerista do pedido
    descricao = models.TextField() # Descrição do pedido

    class Meta:
        ordering = ['data_de_criacao']
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return f"Pedido {self.id} - {self.get_status_display()}"



class Pagamento(models.Model):
    valor = models.DecimalField(max_digits=6, decimal_places=2)
    data_pagamento = models.DateTimeField(default=timezone.now)
    metodo_pagamento = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default='Pendente')
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='pagamento',null=True)

    def  __str__(self):
            return f'Pagamento #{self.id} - R$ {self.valor}'


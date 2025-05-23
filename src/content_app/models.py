from django.db import models
from django.contrib.auth.models import User

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

class Pedido(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=6, decimal_places=2)
    descricao = models.TextField()

    def __str__(self):
        return self.nome
    
    
class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    premium = models.BooleanField(default=False)
 
    def __str__(self):
        return self.nome
    
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
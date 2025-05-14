from django.db import models

# Create your models here.

class Pedido(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=6, decimal_places=2)
    descricao = models.TextField()

    def __str__(self):
        return self.nome
    
    
class Cliente(models.Model):
    nome = models.CharField(max_length = 100)
    cpf = models.CharField(max_length = 11, unique = True)
    data_nascimento = models.DateField()
    premium = models.BooleanField(default=False)
    rua = models.CharField(max_length = 255)
    cep = models.CharField(max_length = 10)
    numero = models.CharField(max_length = 10)
    #email = models.CharField(max_length = 100)
    #senha = models.CharField(max_length = 50, validators=[MinLengthValidator(8)])
 
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

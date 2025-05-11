from django.db import models

# Create your models here.

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

from django.contrib import admin
from content_app.models import Cliente, Motorista, Produto, Pedido



class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'descricao')

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('cliente','preco', 'status', 'motorista')

class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_motorista', 'veiculo', 'telefone', 'cnh')

admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Produto,ProdutoAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(Motorista, MotoristaAdmin)

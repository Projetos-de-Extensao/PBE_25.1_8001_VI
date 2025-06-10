from django.contrib import admin
from content_app.models import Cliente, Motorista, Pedido



class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

class PedidoAdmin(admin.ModelAdmin):
    list_filter = ('status','cliente__username')
    list_display = ('cliente','preco', 'status', 'motorista', 'data_de_criacao')
    search_fields = ('cliente__username',)

class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_motorista', 'veiculo', 'telefone', 'cnh')

admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(Motorista, MotoristaAdmin)

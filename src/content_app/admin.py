from django.contrib import admin
from content_app.models import Content, Pedido, Cliente, Motorista, Loja
from content_app import models

class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']

    fieldsets = (
    ('Informações Básicas', {'fields': ('title', 'description')}),
    ('Detalhes do Arquivo', {'fields': ('file_url', 'thumbnail_url')}),
    ('Interações', {'fields': ('likes', 'views')}),
    ('conteúdo', {'fields': ('content_type', 'is_public')}),
  )
    
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco')

class LojaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'telefone')

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_motorista')

    

class ModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']
    fields = ('title', 'description', 'file_url', 'thumbnail_url', 'creator')


admin.site.register(Content, ContentAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Loja, LojaAdmin)
admin.site.register(Motorista, MotoristaAdmin)
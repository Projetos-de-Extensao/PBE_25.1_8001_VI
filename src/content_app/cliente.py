"""
from content_app.models import Pedido, Avaliacao

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

class LojaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'telefone')

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_motorista')

class AvaliacaoAdmin(admin.ModelAdmin):
    list_display = ('nome_cliente', 'nome_loja','comentario')

class ModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']
    fields = ('title', 'description', 'file_url', 'thumbnail_url', 'creator')

"""
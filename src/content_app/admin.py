from django.contrib import admin
from content_app.models import Content, Cliente, Motorista, Loja, Produto

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

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'descricao')

class ModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']
    fields = ('title', 'description', 'file_url', 'thumbnail_url', 'creator')

admin.site.register(Content, ContentAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Loja, LojaAdmin)
admin.site.register(Motorista, MotoristaAdmin)
admin.site.register(Produto,ProdutoAdmin)
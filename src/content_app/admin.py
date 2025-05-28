from django.contrib import admin
from content_app.models import Cliente, Motorista, Produto



class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_motorista')

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'descricao')

class ModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']
    fields = ('title', 'description', 'file_url', 'thumbnail_url', 'creator')

admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Motorista, MotoristaAdmin)
admin.site.register(Produto,ProdutoAdmin)
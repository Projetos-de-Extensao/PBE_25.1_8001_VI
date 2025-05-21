from django.contrib import admin
from content_app.models import Content

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
    

class ModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'is_public')
    list_filter = ('content_type', 'is_public')
    search_fields = ('title', 'description')
    ordering = ['-upload_date']
    fields = ('title', 'description', 'file_url', 'thumbnail_url', 'creator')


admin.site.register(Content, ContentAdmin)
from django.contrib import admin
from content_app import models

# Register your models here.

admin.site.register(models.Pedido)
admin.site.register(models.Cliente)
admin.site.register(models.Loja)
admin.site.register(models.Avaliacao)


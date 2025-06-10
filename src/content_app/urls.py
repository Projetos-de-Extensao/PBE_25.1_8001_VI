from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,PedidoViewSet,MotoristaViewSet, verificar_cpf, cadastrar_cliente_view
from django.urls import path


router = DefaultRouter()
router.register(r'cliente', ClienteViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'motorista', MotoristaViewSet)

urlpatterns = router.urls + [
     path('verificar-cpf/', verificar_cpf, name='verificar-cpf'),
     path('registrar/', cadastrar_cliente_view, name='registrar-cliente'),
]


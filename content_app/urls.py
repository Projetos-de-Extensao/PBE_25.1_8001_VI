from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,PedidoViewSet,LojaViewSet,AvaliacaoSet

router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'loja', LojaViewSet)
router.register(r'avaliações', AvaliacaoSet)

urlpatterns = router.urls
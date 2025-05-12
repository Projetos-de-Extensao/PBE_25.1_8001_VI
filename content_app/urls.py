from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,PedidoViewSet

router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet)
router.register(r'clientes', ClienteViewSet)

urlpatterns = router.urls
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,ProdutoViewSet,PedidoViewSet,MotoristaViewSet

router = DefaultRouter()
router.register(r'produto', ProdutoViewSet)
router.register(r'cliente', ClienteViewSet)
router.register(r'pedido', PedidoViewSet)
router.register(r'motorista', MotoristaViewSet)

urlpatterns = router.urls
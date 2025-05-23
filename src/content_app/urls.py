from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,ProdutoViewSet,LojaViewSet

router = DefaultRouter()
router.register(r'produto', ProdutoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'loja', LojaViewSet)

urlpatterns = router.urls
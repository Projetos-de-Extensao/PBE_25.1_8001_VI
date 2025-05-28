from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet,ProdutoViewSet

router = DefaultRouter()
router.register(r'produto', ProdutoViewSet)
router.register(r'clientes', ClienteViewSet)

urlpatterns = router.urls
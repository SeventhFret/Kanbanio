from rest_framework.routers import DefaultRouter
from .views import TodoViewSet


router = DefaultRouter()
router.register("", TodoViewSet)

urlpatterns = router.urls


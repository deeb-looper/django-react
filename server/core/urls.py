from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todo/', include('todo_api.urls', namespace='todo_api')),
    path('api/user/', include('users.urls', namespace='users')),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]

from django.urls import path, include
from .views import PostList, PostDetail
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'posts', PostList, 'posts')

app_name = 'blog_api'

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate'),
    # path('', include(router.urls))
]

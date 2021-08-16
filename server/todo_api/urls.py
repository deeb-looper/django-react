from django.urls import path

from .views import TodoList, TodoDetail

app_name = 'todo_api'

urlpatterns = [
    path('<int:pk>/', TodoDetail.as_view(), name='detailcreate'),
    path('', TodoList.as_view(), name='listcreate'),
]

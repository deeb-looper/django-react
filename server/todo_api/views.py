from .serializers import TodoSerializer
from rest_framework import generics
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated
from .models import Todo

class TodoUserWritePermission(BasePermission):
    message = 'Editing todo is restricted to the author only.'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.creator == request.user

class TodoList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(creator=user)

class TodoDetail(generics.RetrieveUpdateDestroyAPIView, TodoUserWritePermission):
    permission_classes = [TodoUserWritePermission]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

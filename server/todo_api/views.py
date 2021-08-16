from django.shortcuts import render
from .serializers import TodoSerializer
from rest_framework import generics, viewsets
from rest_framework.permissions import BasePermission, IsAdminUser, DjangoModelPermissions, SAFE_METHODS, IsAuthenticated
from .models import Todo

class TodoUserWritePermission(BasePermission):
    message = 'Editing todo is restricted to the author only.'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.creator == request.user

class TodoList(generics.ListCreateAPIView):
    # class PostList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all().order_by('-created_at')

class TodoDetail(generics.RetrieveUpdateDestroyAPIView, TodoUserWritePermission):
    permission_classes = [TodoUserWritePermission]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
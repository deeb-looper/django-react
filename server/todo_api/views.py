from django.shortcuts import render
from .serializers import TodoSerializer 
from rest_framework import viewsets      
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Todo

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = TodoSerializer   
    queryset = Todo.objects.all() 

from rest_framework import generics, viewsets
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import BasePermission, IsAdminUser, DjangoModelPermissions, SAFE_METHODS, IsAuthenticated

class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
# class PostList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

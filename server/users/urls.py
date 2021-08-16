from django.urls import path
from .views import CustomUserCreate, MyTokenObtainPairView, BlacklistTokenUpdateView, UserProfile

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('login/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('profile/', UserProfile.as_view(), name="profile"),
]
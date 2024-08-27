from django.urls import path, include
from .views import UserListView, UserDetailView, UserSearchView

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),  # For paginated user list
    path('<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('search/', UserSearchView.as_view(), name='user-search')
]
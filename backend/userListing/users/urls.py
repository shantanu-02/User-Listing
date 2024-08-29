from django.urls import path, include
from .views import UserListView, UserDetailView, UserSearchView, FetchAndStoreUserData

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('fetch-random-users/', FetchAndStoreUserData.as_view(), name='fetch_store_users'),
    path('<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('search/', UserSearchView.as_view(), name='user-search')
]
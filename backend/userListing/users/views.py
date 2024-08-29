from django.shortcuts import render

import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from .models import Users
from .serializers import usersSerializer
from django.db.models import Q

class FetchAndStoreUserData(APIView):
    def get(self, request, *args, **kwargs):
        external_api_url = 'https://randomuser.me/api/?results=2'
        external_response = requests.get(external_api_url)

        if external_response.status_code == 200:
            users_data = external_response.json().get('results')
            for user_data in users_data:
                user_serializer = usersSerializer(data={
                    'gender': user_data['gender'],
                    'title': user_data['name']['title'],
                    'first_name': user_data['name']['first'],
                    'last_name': user_data['name']['last'],
                    'street_name': user_data['location']['street']['name'],
                    'street_number': user_data['location']['street']['number'],
                    'city': user_data['location']['city'],
                    'state': user_data['location']['state'],
                    'country': user_data['location']['country'],
                    'postcode': user_data['location']['postcode'],
                    'latitude': user_data['location']['coordinates']['latitude'],
                    'longitude': user_data['location']['coordinates']['longitude'],
                    'timezone_offset': user_data['location']['timezone']['offset'],
                    'timezone_description': user_data['location']['timezone']['description'],
                    'email': user_data['email'],
                    'username': user_data['login']['username'],
                    'password': user_data['login']['password'],
                    'dob': user_data['dob']['date'],
                    'registered': user_data['registered']['date'],
                    'phone': user_data['phone'],
                    'cell': user_data['cell'],
                    'nat': user_data['nat'],
                    'picture_large': user_data['picture']['large'],
                    'picture_medium': user_data['picture']['medium'],
                    'picture_thumbnail': user_data['picture']['thumbnail'],
                })

                if user_serializer.is_valid():
                    user_serializer.save()
                else:
                    return Response(user_serializer.errors, status=400)

            return Response({'message': 'User data fetched and stored successfully'})
        else:
            return Response({'error': 'Failed to fetch data'}, status=external_response.status_code)

class UserListView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = usersSerializer
    pagination_class = PageNumberPagination 

class UserDetailView(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = usersSerializer
    lookup_field = 'id'

class UserSearchView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = usersSerializer
    pagination_class = PageNumberPagination
    
    def get_queryset(self):
        queryset = Users.objects.all()
        query = self.request.query_params.get('query', None)

        if query:
                queryset = queryset.filter(
                    Q(id__icontains=query) |
                    Q(first_name__icontains=query) |
                    Q(last_name__icontains=query) |
                    Q(cell__icontains=query) |
                    Q(email__icontains=query) |
                    Q(gender=query)
                )
        return queryset


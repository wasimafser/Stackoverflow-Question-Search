"""
Using Views for API as the frontend is different.
"""
import requests
from urllib import parse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models

class AdvancedSearchAPI(APIView):

    def get(self, request, format=None):
        """
        Converting the query_params directly to dict to be sent as data.

        This method may not be used in open APIs in production,
        doing it for the sole purpose of finishing the assignment.
        """
        # GET QUERY PARAMS
        query_params = request.query_params
        # Transform QueryDict to Dict for request.
        data = query_params.dict()
        data['site'] = 'stackoverflow'
        # Transform Dict to query for storage
        query = parse.urlencode(data)
        # data = {
        #     'q': '',
        #     'accepted': '',
        #     'answers': '',
        #     'body': '',
        #     'closed': '',
        #     'migrated': '',
        #     'notice': '',
        #     'nottagged': '',
        #     'tagged': '',
        #     'title': '',
        #     'user': '',
        #     'url': '',
        #     'views': '',
        #     'wiki': '',
        #     'fromdate': '',
        #     'todate': '',
        #     'page': '',
        #     'pagesize': '',
        #     'order': '',
        #     'sort': '',
        #     'min': '',
        #     'max': '',
        #     'site': 'stackoverflow'
        # }
        try:
            query_response = models.QueryResponse.objects.get(query=query)
            response_json = query_response.response
        except models.QueryResponse.DoesNotExist:
            response = requests.get(
                "https://api.stackexchange.com/2.2/search/advanced",
                params=data
            )
            response_json = response.json()
            models.QueryResponse.objects.create(query=query, response=response_json)
        return Response(response_json, status=status.HTTP_200_OK)
        # return Response({"TEST": "TEST"}, status=status.HTTP_200_OK)

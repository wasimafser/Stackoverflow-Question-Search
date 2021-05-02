"""
Using Views for API as the frontend is different.
"""
import requests
from urllib import parse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import throttles
from . import tasks

class AdvancedSearchAPI(APIView):
    throttle_classes = [throttles.AnonMinThrottle, throttles.AnonDayThrottle]

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
        try:
            query_response = models.QueryResponse.objects.get(query=query)
            response_json = query_response.response
        except models.QueryResponse.DoesNotExist:
            response = requests.get(
                "https://api.stackexchange.com/2.2/search/advanced",
                params=data
            )
            response_json = response.json()
            tasks.save_queryresponse.delay(query, response_json)
        return Response(response_json, status=status.HTTP_200_OK)

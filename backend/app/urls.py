from django.urls import path

from . import views

urlpatterns = [
    path(
        'search/advanced/',
        views.AdvancedSearchAPI.as_view(),
        name='advanced_search'
    )
]

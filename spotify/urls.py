from .views import AuthURL
from django.urls import path

urlpatterns = [
    path('/get-auth-url', AuthURL.as_view()),
]

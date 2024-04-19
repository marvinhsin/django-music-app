from .views import RoomView
from django.urls import path, include

urlpatterns = [
    path('home', RoomView.as_view()),
]

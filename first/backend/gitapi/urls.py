from django.urls import path
from . import views

app_name="gitapi"
urlpatterns = [
    path('', views.index, name="index"),
    path('github-login/', views.github_login, name="github-login"),
    path('github-access-token/', views.github_access_token, name="github_access_token"),
]

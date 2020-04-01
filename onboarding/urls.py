from django.urls import path
from . import views
from django.conf.urls import url
from . import views as core_views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^signup/$', core_views.signup, name='signup'),
]
from django.urls import path
from . import views
from django.conf.urls import url
from . import views as core_views

urlpatterns = [
    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),
    # path('package/<int:pk>/', views.PackageDetailView.as_view(), name='package-detail'),
]


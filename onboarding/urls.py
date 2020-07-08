from django.urls import path
from . import views
from django.conf.urls import url
from . import views as core_views

urlpatterns = [
    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),
    path('package/<int:pk>/', views.package_view, name='package'),
    path('page/<int:pk>/', views.page_view, name='page'),
    path('api/packages/', views.PackageListView.as_view(), name='packages_list'),

    path('bootstrap/signin', views.bootstrap_signin, name='bootstrap_signin'),
    path('bootstrap/sign-up', views.bootstrap_signup, name='bootstrap_signup'),
    path('bootstrap/dashboard', views.bootstrap_dashboard, name='bootstrap_dashboard'),
]


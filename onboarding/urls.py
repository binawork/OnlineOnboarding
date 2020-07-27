from django.urls import path
from . import views
from django.conf.urls import url
from . import views as core_views
from rest_framework.views import APIView

urlpatterns = [
    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),
    # path('package/<int:pk>/', views.package_view, name='package'), # todo: check this url;
    # path('page/<int:pk>/', views.page_view, name='page'), # todo: check this url;

    # path('bootstrap/signin', views.bootstrap_signin, name='bootstrap_signin'),
    # path('bootstrap/sign-up', views.bootstrap_signup, name='bootstrap_signup'),
    path('bootstrap/dashboard', views.bootstrap_dashboard, name='bootstrap_dashboard'),
    path('bootstrap/packages', views.bootstrap_packages, name='bootstrap_packages'),
    path('bootstrap/package-page', views.bootstrap_1_package, name='bootstrap_1_package'),
    path('bootstrap/forms', views.bootstrap_forms, name='bootstrap_forms'),

    # API
    path('api/add/email/', views.AddEmailToPackageView.as_view(), name='add_email'),

    path('api/packages/', views.PackageListView.as_view(), name='packages_list'),
    path('api/package/<int:pk>/', views.PackageView.as_view(), name='package_view'),
    path('api/package/create/', views.CreatePackageView.as_view(), name='package_create'),
    path('api/package/<int:pk>/add/user/', views.AddEmailToPackageView.as_view(), name='add_user_to_package'),


]


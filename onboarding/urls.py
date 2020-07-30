from django.urls import path, include
from . import views
from django.conf.urls import url
from . import views as core_views
from rest_framework import routers

urlpatterns = [
    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),

    path('bootstrap/dashboard', views.bootstrap_dashboard, name='bootstrap_dashboard'),
    path('bootstrap/packages', views.bootstrap_packages, name='bootstrap_packages'),
    path('bootstrap/package-page', views.bootstrap_1_package, name='bootstrap_1_package'),
    path('bootstrap/forms', views.bootstrap_forms, name='bootstrap_forms'),
]

# API
urlpatterns += [
    path('api/add/email/', views.AddEmailVew.as_view(), name='add_email'),

    path('api/packages/', views.PackageListView.as_view(), name='packages_list'),
    path('api/package/<int:pk>/', views.PackageView.as_view(), name='package_view'),
    path('api/package/create/', views.CreatePackageView.as_view(), name='package_create'),

    path('api/pages/by/package/<int:pk>/', views.PageListByPackageIdView.as_view(), name='pages_list_by_package_pk'),


]




# router = routers.DefaultRouter()
# router.register('api/package/test', views.PackageHyperLinkView)
# router.register('api/user/test', views.UserHyperLinkView, basename='user_test')
#
# urlpatterns += [path('', include(router.urls))]
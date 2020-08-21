from django.urls import path, include
from . import views
from . import views as core_views
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers

from .views import PackageViewSet, PageViewSet, SectionViewSet, UserViewSet, AnswerViewSet

urlpatterns = [

    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),

    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),

    path('bootstrap/dashboard', views.bootstrap_dashboard, name='bootstrap_dashboard'),
    path('bootstrap/packages', views.bootstrap_packages, name='bootstrap_packages'),
    path('bootstrap/package-page', views.bootstrap_1_package, name='bootstrap_1_package'),
    path('bootstrap/forms', views.bootstrap_forms, name='bootstrap_forms'),
]

# API

router = DefaultRouter()
router.register(r'api/users', UserViewSet, basename='User')
router.register(r'api/package', PackageViewSet, basename='Package')
router.register(r'api/page', PageViewSet, basename='Page')
router.register(r'api/section', SectionViewSet, basename='Section')
router.register(r'api/answer', AnswerViewSet, basename='Answer')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns += [
    path(r'', include(router.urls)),
    path(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth')

]
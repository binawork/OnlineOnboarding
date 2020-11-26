from . import views
from . import views as core_views
from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import views as auth_views

#from django.conf import settings
#from django.conf.urls.static import static

from .views import PackageViewSet, PageViewSet, SectionViewSet, UserViewSet, AnswerViewSet, CompanyViewSet, \
    ContactFormViewSet, CompanyQuestionAndAnswerViewSet, UserAvatarUpload, UserProgressOnPageView,\
    UserProgressOnPackageView, PackagePagesViewSet, SectionAnswersViewSet, CustomPasswordResetConfirmView

# base
urlpatterns = [
    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),
]

# password reset
urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='registration/password_reset_done.html'),
         name='password_reset_done'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(
        template_name='registration/password_reset_complete.html'),
        name='password_reset_complete'),
    path("password_reset/", views.password_reset_request, name="password_reset"),
    path('reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(
        template_name="registration/password_reset_confirm.html"),
         name='account_activation_for_users_created_by_hr'),

    # path('reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(
    #     template_name="templated_email/register_user_by_hr.html"),
    #      name='password_reset_confirm'),
]

# email
urlpatterns += [
    path('email/activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('email/reminder/<employee_id>/<package_id>/', views.reminder, name='reminder'),
]

#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# API
urlpatterns += [
    path(r'api/user/<int:employe_id>/progress_on_page/<int:page_id>/', UserProgressOnPageView.as_view(), name='progress_on_page'),
    path(r'api/user/<int:employe_id>/progress_on_package/<int:package_id>/', UserProgressOnPackageView.as_view(), name='progress_on_package'),
]


router = DefaultRouter()
router.register(r'api/users', UserViewSet, basename='User')
router.register(r'api/company', CompanyViewSet, basename='Company')
router.register(r'api/package', PackageViewSet, basename='Package')
router.register(r'api/page', PageViewSet, basename='Page')
router.register(r'api/section', SectionViewSet, basename='Section')
router.register(r'api/answer', AnswerViewSet, basename='Answer')
router.register(r'api/contact_form', ContactFormViewSet, basename='contact_form')
router.register(r'api/q_and_a', CompanyQuestionAndAnswerViewSet, basename='contact_form')
router.register(r'api/package_pages', PackagePagesViewSet, basename='PackagePages')
router.register(r'api/section_answers', SectionAnswersViewSet, basename='SectionAnswers')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns += [
    path(r'', include(router.urls)),
    path(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
    path("api/user-avatar/", UserAvatarUpload.as_view(), name="rest_user_avatar_upload"),

]

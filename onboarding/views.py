from abc import ABC
from django.core import mail
from django.core.mail import BadHeaderError
from django.contrib.auth import login, get_user_model
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.db.models.query_utils import Q, FilteredRelation
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.contrib.postgres.aggregates import ArrayAgg

from rest_framework import viewsets, filters, status, generics, views, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


from OnlineOnboarding.settings import EMAIL_HOST_USER
from onboarding.models import Package, ContactRequestDetail, Page, Section, Answer
from onboarding.models import User, Company, CompanyQuestionAndAnswer

from .serializers import UserSerializer, UserAvatarSerializer, LogInUserSerializer, UserJobDataSerializer,\
    UserUpdateSerializer, UsersListSerializer, UserProgressSerializer, UserProgressLimitedSerializer
from .serializers import PageSerializer, SectionSerializer, AnswersProgressStatusSerializer, PackageUsersSerializer
from .serializers import PackageSerializer, PackageForHrSerializer, PageSerializer, SectionSerializer, SectionAnswersSerializer, PackageAddUsersSerializer
from .serializers import CompanyQuestionAndAnswerSerializer, PackagesUsers, ContactFormTestSerializer
from .serializers import PackagePagesSerializer, PackagePagesForHrSerializer, PackagePagesForUsersSerializer
from .serializers import AnswerSerializer, CompanySerializer,CompanyFileSerializer, WhenPackageSendToEmployeeSerializer


from .permissions import IsHrUser
from .mailing import send_activation_email_for_user_created_by_hr, send_reminder_email, send_add_user_to_package_email, send_remove_acc_email, answer_send_notification_email
from .tokens import account_activation_token
from .forms import HrSignUpForm, HrSignUpFormEng, CustomSetPasswordForm


def index(request):
    """View function for home page of site."""
    return render(request, 'index.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        # user.is_active = True
        user.save()
        # login(request, user)
        # return redirect('home')
        return render(request, 'registration/register_email_confirm.html')
    else:
        return HttpResponse('Activation link is invalid!')


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    form_class = CustomSetPasswordForm


def signup(request):
    if request.method == 'POST':
        request_as_dict = request.__dict__
        if request_as_dict['environ']['HTTP_ACCEPT_LANGUAGE'].find('pl') != -1:
            signup_form = HrSignUpForm(request.POST)
        else:
            signup_form = HrSignUpFormEng(request.POST)
        if signup_form.is_valid():
            user = signup_form.save()
            current_site = get_current_site(request)
            subject = 'Rejestracja w Online Onboarding '
            html_message = render_to_string(
                'templated_email/acc_active_email.html',
                {
                    'user': user,
                    'domain': current_site.domain, # to fix: should it be in local_settings.py bec. it is another on a server?
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                }
            )
            plain_message = strip_tags(html_message)
            from_email = EMAIL_HOST_USER
            to = signup_form.cleaned_data.get('email')
            mail.send_mail(
                            subject,
                            plain_message,
                            from_email,
                            [to],
                            html_message=html_message
            )
            return render(request, 'registration/register_done.html')
    else:
        request_as_dict = request.__dict__
        if request_as_dict['environ']['HTTP_ACCEPT_LANGUAGE'].find('pl') != -1:
            signup_form = HrSignUpForm()
        else:
            signup_form = HrSignUpFormEng()
    return render(
                    request,
                    'bootstrap/auth-signup.html',
                    {'form': signup_form},
    )


def password_reset_request(request):
    if request.method == 'POST':
        password_reset_form = PasswordResetForm(request.POST)
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                current_site = get_current_site(request)
                for user in associated_users:
                    subject = 'Zmiana hasła' # eng. "password change"
                    html_message = render_to_string(
                        'templated_email/password_reset_email.html',
                        {
                            'email': user.email,
                            'domain': current_site.domain, # to fix: should it be in local_settings.py bec. it is another on a server?
                            'site_name': 'Website',
                            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                            'user': user,
                            'token': default_token_generator.make_token(user),
                            'protocol': 'http',
                        }
                    )
                    plain_message = strip_tags(html_message)
                    from_email = EMAIL_HOST_USER
                    try:
                        mail.send_mail(
                                        subject,
                                        plain_message,
                                        from_email,
                                        [user.email],
                                        html_message=html_message,
                                        fail_silently=False
                        )
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect('/password_reset/done/')

    password_reset_form = PasswordResetForm()

    return render(
        request=request,
        template_name='registration/password_reset_form.html',
        context={'form': password_reset_form})
# {'password_reset_form': password_reset_form} didn't work;


# should send information to front about send reminder or not?
@login_required()
def reminder(request, employee_id, package_id):
    current_site = get_current_site(request)
    subject = 'Przypomnienie'
    employee = User.objects.get(id=employee_id)
    package = Package.objects.get(id=package_id)
    if request.user.company == employee.company:
        send_reminder_email(
            subject,
            EMAIL_HOST_USER,
            employee,
            package,
            current_site)
    return HttpResponse(current_site)


@login_required
def manager_view(request):
    """
    hr/employee have different template
    :param request: need information this user is hr?
    :return: template for hr and for employee
    """
    context = {'is_hr': request.user.is_hr}
    return render(request, 'react/manage.html', context)
    # if request.user.is_hr:  # for hr
    #     return render(request, 'react/hr.html')
    # if not request.user.is_hr:  # for employee
    #     return render(request, 'react/employee.html')


# REST

# ViewSets define the view behavior

class CompanyLogoViewSet(views.APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if self.request.user.is_hr:
            serializer = CompanyFileSerializer(data=request.data,
                                               instance=request.user.company)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)


class UserAvatarUpload(views.APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserAvatarSerializer(data=request.data, instance=request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsHrUser, IsAuthenticated)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "login_user" or self.action == "update_user":
            self.permission_classes = [IsAuthenticated,]
        else:
            self.permission_classes = [IsHrUser, IsAuthenticated]
        return super(self.__class__, self).get_permissions()

    def get_queryset(self):
        return User.objects.filter(company=self.request.user.company)

    def get_serializer_class(self):
        if self.action == "login_user":
            return LogInUserSerializer
        elif self.action == "update_user":
            return UserUpdateSerializer
        return UserSerializer

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)

    @action(detail=False, methods=['get'])
    def login_user(self, request):
        queryset = User.objects.filter(pk=self.request.user.id)
        serializer = LogInUserSerializer(queryset, many=True)
        response = Response(serializer.data)
        queryset.update(welcome_board=False)

        return response

    @action(detail=False, methods=['get', 'patch'])
    def update_user(self, request):
        """
        List (GET) or updates (PATCH) some fields which employees are free to manage
        return: free to manage fields or "bad request"
        """
        if request.method == 'PATCH':
            serializer = UserUpdateSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                queryset = User.objects.get(pk=self.request.user.id)  # user can change only his own data;
                serializer.update(instance=queryset, validated_data=serializer.validated_data)
                return Response(serializer.validated_data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            queryset = User.objects.get(pk=self.request.user.id)
            serializer = UserUpdateSerializer(queryset, many=False)

        return Response(serializer.data)

    def list(self, request):

        queryset = User.objects.filter(company=self.request.user.company)
        serializer = UsersListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        permission_classes = [IsHrUser, IsAuthenticated]
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            user.company = self.request.user.company
            user_email = user.email
            user.save()
            current_site = get_current_site(request)
            associated_users = User.objects.filter(Q(email=user_email))
            if associated_users.exists():
                for user in associated_users:
                    send_activation_email_for_user_created_by_hr(user=user,
                        current_site=current_site)
            return Response(status=201)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



    @action(detail=False)
    def remove_user(self, request):
        permission_classes = (IsHrUser, IsAuthenticated)
        user_email = request.user.email
        username = request.user.username
        request.user.email = 'removed'
        request.user.first_name = 'removed'
        request.user.last_name = 'removed'
        request.user.is_active = False
        request.user.save()

        send_remove_acc_email(
            EMAIL_HOST_USER,
            user_email
        )
        return Response(status=204)


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    @action(detail=False)
    def user_job_data(self, request):
        queryset = User.objects.filter(company=self.request.user.company).aggregate(location=ArrayAgg('location', distinct=True))
        from django.db import connection
        connection.queries.aggregate(result=ArrayAgg('team')).aggregate(result=ArrayAgg('job_position')).distinct("location",'team','job_position')

        serializer = UserJobDataSerializer(queryset, many=True)

        return Response(serializer.data)


class CompanyQuestionAndAnswerViewSet(viewsets.ModelViewSet):
    queryset = CompanyQuestionAndAnswer.objects.all()
    serializer_class = CompanyQuestionAndAnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)

    @action(detail=False)
    def list_by_company(self, request):
        """
        :param request: user
        :return: all Q-and-A with param request.user.company
        """
        q_and_a = CompanyQuestionAndAnswer.objects.filter(company_id=request.user.company.id)
        serializer = CompanyQuestionAndAnswerSerializer(q_and_a, many=True)

        return Response(serializer.data)


class ContactFormViewSet(viewsets.ModelViewSet):
    """
    List all packages, update or create a new package.
    """
    queryset = ContactRequestDetail.objects.all()
    serializer_class = ContactFormTestSerializer


class PackagesUsersViewSet(viewsets.ModelViewSet):
    default_serializer_class = PackageAddUsersSerializer
    permission_classes = [IsAuthenticated, IsHrUser]

    def get_queryset(self):
        if self.action == 'add_user_to_package':
            return Package.objects.filter(owner=self.request.user.company)
        return PackagesUsers.objects.filter(user__company=self.request.user.company)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PackageAddUsersSerializer
        return PackageUsersSerializer

    def destroy(self, request, *args, **kwargs):
        user_id = kwargs.get('pk', None)
        package_id = request.data.get('package', None)

        if user_id is None or package_id is None:
            return Response({"detail": "key-pair error!"}, status=status.HTTP_400_BAD_REQUEST)

        instance = PackagesUsers.objects.filter(user_id=user_id, package=package_id)
        exists = instance.count()
        if exists:
            self.perform_destroy(instance)

            queryset = Answer.objects.filter(section__page__package_id=package_id, owner_id=user_id)
            queryset.update(owner=None)

        return Response(status=status.HTTP_204_NO_CONTENT)  # status.HTTP_404_NOT_FOUND

    @action(detail=True, methods=['post'])
    def add_user_to_package(self, request, pk=None):
        """
        :param request: user id in request.data.users
        :param pk: package primary key
        """
        package = Package.objects.get(id=pk)
        pkg_company = package.owner
        hr_user = User.objects.get(id=request.user.id)
        users = User.objects.filter(id__in=request.data["users"])
        # serializer = PackageAddUsersSerializer

        for user in users:

            # check if the hr_user is from the same company as the package (form)
            # to which he /she wants to add a new user
            if hr_user.company_id == pkg_company.id:
                pass
            else:
                raise ValueError("""Możesz dodawać tylko do formularzy firmy, do
                    której należysz.""")

            # check if the hr_user is from the same company as the user
            # he /she wants to add to the package (form)
            if hr_user.company_id == user.company_id:
                pass
            else:
                raise ValueError("""Możesz dodawać do formularzy tylko tych
                    użytowników, którzy są z tej samej firmy.""")

        users |= User.objects.filter(id=hr_user.id)
        for user in users:
            if user not in package.users.all():
                package.users.add(user)
                if user.is_hr != True:
                    send_add_user_to_package_email(
                        EMAIL_HOST_USER,
                        user,
                        package)

        serializer = PackageSerializer(package)
        return Response(serializer.data)

    """
    @action(detail=True, methods=['get', 'delete'])
    def rm_sent(self, request, pk, *args, **kwargs):
        package_id = request.data.get('package', None)

        if package_id is not None:
            package_users = PackagesUsers.objects.filter(user=pk, package=package_id)
        else:
            package_users = PackagesUsers.objects.filter(user=pk)
        serializer = PackageUsersSerializer(package_users, many=True)
        return Response(serializer.data)
    """


class PackageViewSet(viewsets.ModelViewSet):
    """
    List all package, or create a new package.
    """
    default_serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user is not None:
            if user.is_hr:
                queryset = Package.objects.filter(owner=user.company)
            else:
                queryset = Package.objects.filter(owner=user.company, users=user)
        else:
            queryset = Package.objects.none()

        return queryset

    def get_serializer_class(self):
        if self.request.user.is_hr:
            return PackageForHrSerializer
        return PackageSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)

    """@action(detail=True, methods=['post'])
    def add_user_to_package(self, request, pk=None):
        " " "
        :param request: user id in request.data.users
        :param pk: package primary key
        " " "
        package = Package.objects.get(id=pk)
        pkg_company = package.owner
        hr_user = User.objects.get(id=request.user.id)
        user = User.objects.get(id=request.data['users'])

        # check if the hr_user is from the same company as the package (form)
        # to which he /she wants to add a new user
        if hr_user.company_id == pkg_company.id:
            pass
        else:
            e = "Możesz dodawać tylko do formularzy firmy, do której należysz."
            raise ValueError(e)

        # check if the hr_user is from the same company as the user
        # he /she wants to add to the package (form)
        if hr_user.company_id == user.company_id:
            pass
        else:
            e2 = "Możesz dodawać do formularzy tylko tych użytowników, którzy"
            e3 = " są z tej samej firmy."
            e4 = e2 + e3
            raise ValueError(e4)

        if user not in package.users.all():
            package.users.add(user)
            send_add_user_to_package_email(
                EMAIL_HOST_USER,
                user,
                package
            )

        serializer = PackageUsersSerializer(package)

        return Response(serializer.data) """


class PageViewSet(viewsets.ModelViewSet):
    """
    Page Model View Set
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
                        serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)

    @action(detail=True)
    def list_by_package_hr(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(
            package__id=pk  # add in the future,owner__page=request.user.company
        )
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def list_by_package_employee(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(
                                    package__id=pk,
                                    owner=self.request.user.company,
                                    package__users=self.request.user)
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)


class PackagePagesViewSet(viewsets.ModelViewSet):
    """
    List all Packages with related pages.
    """
    default_serializer_class = PackagePagesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user is not None:
            if user.is_hr:
                queryset = Package.objects.filter(owner=user.company)
            else:
                queryset = Package.objects.filter(owner=user.company, users=user)
        else:
            queryset = Package.objects.none()

        return queryset

    def get_serializer_class(self):
        if self.request.user.is_hr:
            return PackagePagesForHrSerializer
        return PackagePagesSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsHrUser], serializer_class=PackagePagesForUsersSerializer)
    def users(self, request):
        """
        :param request: user
        :return: all packages with corresponding pages for company of the authenticated user having few fields
        """
        package_pages = Package.objects.filter(owner=request.user.company, users__isnull=False).distinct()
        serializer = PackagePagesForUsersSerializer(package_pages, many=True)
        return Response(serializer.data)
#


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)
#TBD: double check if 'sections' are not duplicating (see: serializers.py,
#SectionSerializer, validate())
        # if serializer.is_valid():
        #     serializer.save(owner=self.request.user.company)
        # else:
        #     return Response(serializer.errors,
        #                     status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def list_by_page_hr(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(
            page__id=pk,
            owner=self.request.user.company
        )  # add in the future
        # owner__page=request.user.company
        serializer = SectionSerializer(section, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def list_by_page_employee(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(
            page__id=pk,
            owner=self.request.user.company,
            page__package__users=self.request.user,
        )
        serializer = SectionSerializer(section, many=True)

        return Response(serializer.data)


class AnswerViewSet(viewsets.ModelViewSet):
    default_serializer_class = AnswerSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'finished' or self.action == 'page_progress':
            return AnswersProgressStatusSerializer
        else:
            return AnswerSerializer

    def get_queryset(self):
        user = self.request.user

        if user is None or self.request.user.is_hr:
            queryset = Answer.objects.filter(section__page__owner=self.request.user.company)
        else:
            queryset = Answer.objects.filter(owner=user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True)
    def list_by_section_hr(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(
                        section__id=pk,
                        section__page__package__owner=self.request.user.company)
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def list_by_section_employee(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(
                                section__id=pk,
                                owner=self.request.user,
                                section__page__package__users=self.request.user
        )
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['get', 'patch'])
    def finished(self, request, pk):
        """
        :param request:
        :param pk: this is section ID if method is GET or page ID of section it
        belongs to if the method is PATCH
        :return: answers list by section id
        """

        if request.method == 'PATCH':
            answers = Answer.objects.filter(section__page__id=pk,
                                            owner=self.request.user)  # id__in=request.data['answers']
            if answers.count() < 1:
                return Response(status=status.HTTP_404_NOT_FOUND)
            answers.update(finished=True)

        elif request.method == "GET":
            answers = Answer.objects.filter(
                                section__id=pk,
                                owner=self.request.user,
                                section__page__package__users=self.request.user
            )

        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = AnswersProgressStatusSerializer(answers, many=True)

        if request.method == 'PATCH':
            '''
            Mail notification - sends an email to hr user after the employee
            completes an assigment.
            '''
            page_id = Page.objects.get(id=pk)
            package_id = Package.objects.get(id=page_id.package_id)
            packagesusers = PackagesUsers.objects.extra(where=[
            "package_id='{}'".format(package_id.id)])
            for p in packagesusers:
                if p.user.is_hr is True:
                    hr_user = p.user
            page_name = Page.objects.get(id=pk)
            answer_send_notification_email(EMAIL_HOST_USER, hr_user.email,
                self.request.user.email, page_name.title, hr_user)


#Version which is sending an email to all HR users in the company;
#Beware! It need tuning (ValueError: Invalid address - email adress is a list,
#at least for a single user).
            # page_name = Page.objects.get(id=pk)
            # hr_email = []
            # hr_users_list = User.objects.filter(company = self.request.user.company,
            #     is_hr = True)
            # for hr_user in hr_users_list:
            #     hr_email.append(hr_user.email)
            # answer_send_notification_email(EMAIL_HOST_USER, hr_email,
            #     self.request.user.email, page_name.title)

            return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def page_progress(self, request, pk):
        """
        :param request:
        :param pk:
        :return: answers list by page id and for specified user
        """
        #if pk is None:
        #    return Response(status=status.HTTP_400_BAD_REQUEST)

        user_id = self.request.user
        if request.user.is_hr:
            user_id = self.kwargs.get('user_id', None)

        queryset = Answer.objects.filter(section__page_id=pk,
                                         owner_id=user_id)
        serializer = AnswersProgressStatusSerializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated, IsHrUser], serializer_class=AnswersProgressStatusSerializer)
    def confirm(self, request, pk):
        """
        :param request:
        :param pk: id of page for answers which have to be confirmed
        :return:
        """
        # if not request.user.is_hr:
        #     return Response(status=status.HTTP_403_FORBIDDEN)

        user_id = request.data.get('user', None)
        if user_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        answers = Answer.objects.filter(section__page_id=pk,
                                         owner_id=user_id)
        if answers.count() < 1:
            return Response(status=status.HTTP_404_NOT_FOUND)

        answers.update(confirmed=True)

        serializer = AnswersProgressStatusSerializer(answers, many=True)
        return Response(serializer.data)


class UserProgressOnPageView(generics.ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswersProgressStatusSerializer

    def get(self, request, *args, **kwargs):
        employee_id = kwargs.get('employee_id')
        page_id = kwargs.get('page_id')

        queryset = Answer.objects.filter(section__page_id=page_id,
                                         owner_id=employee_id)
        serializer = AnswersProgressStatusSerializer(queryset, many=True)

        return Response(serializer.data)


class UserProgressOnPackageView(generics.ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswersProgressStatusSerializer

    def get(self, request, *args, **kwargs):
        employee_id = kwargs.get('employee_id')
        package_id = kwargs.get('package_id')

        queryset = Answer.objects.filter(
            section__page__package_id=package_id,
            owner_id=employee_id)
        serializer = AnswersProgressStatusSerializer(queryset, many=True)

        return Response(serializer.data)


class WhenPackageSendToEmployeeView(generics.ListAPIView):
    queryset = PackagesUsers.objects.all()
    serializer_class = WhenPackageSendToEmployeeSerializer

    def get(self, request, *args, **kwargs):
        employee_id = kwargs.get('employee_id')
        package_id = kwargs.get('package_id', None)

        if package_id is not None:
            queryset = PackagesUsers.objects.filter(
                package_id=package_id,
                user_id=employee_id,
                user__company=request.user.company
            )
        else:
            queryset = PackagesUsers.objects.filter(
                user_id=employee_id,
                user__company=request.user.company
            )

        serializer = WhenPackageSendToEmployeeSerializer(queryset, many=True)
        return Response(serializer.data)


class UserProgressView(viewsets.ReadOnlyModelViewSet):
    """
    List answers of user/employee with corresponding sections with information
        about page and package id;
    """
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        employee = self.kwargs.get('user_id', None)

        if self.request.user.is_hr:
            if employee is not None:
                # queryset = Page.objects.filter(section__answer__owner=employee, section__owner=user.company)
                queryset = Answer.objects.select_related('section', 'section__page').filter(owner=employee, section__owner=user.company)
            else:
                # users = User.objects.filter(company=self.request.user.company)
                # queryset = Answer.objects.select_related('section', 'section__page').filter(owner__in=users, section__owner=user.company)
                queryset = Answer.objects.none()
            #
        else:
            queryset = Answer.objects.select_related('section', 'section__page').filter(owner=user, section__owner=user.company)

        return queryset

    @action(detail=False, permission_classes=[IsAuthenticated, IsHrUser], serializer_class=UserProgressLimitedSerializer, url_name="progress-of-all")
    def list_all(self, request, pk=None):
        # if not self.request.user.is_hr:
        #     return Response(status.HTTP_403_FORBIDDEN)

        user = self.request.user

        users = User.objects.filter(company=user.company)
        queryset = Answer.objects.select_related('section', 'section__page').filter(owner__in=users, section__owner=user.company)

        serializer = UserProgressLimitedSerializer(queryset, many=True)
        return Response(serializer.data)
#


class SectionAnswersViewSet(viewsets.ModelViewSet):
    """List all Sections with related answers."""
    serializer_class = SectionAnswersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        page_args = self.kwargs['page']

        if page_args is not None and self.request.user.is_hr:
            queryset = Section.objects.filter(page__id=page_args,
                                              owner=self.request.user.company)
        else:
            q1 = Q(page__id=page_args,
                   owner=self.request.user.company,
                   # answer__owner=self.request.user,
                   page__package__users=self.request.user)
            # q_owner = Q(answer__owner=self.request.user)
            # queryset = Section.objects.annotate(ans=FilteredRelation('answer', condition=q_owner)).filter(q1)
            queryset = Section.objects.filter(q1)
        return queryset

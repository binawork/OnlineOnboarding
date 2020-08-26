from django.contrib.auth.decorators import login_required
from django.core import mail
from django.utils.html import strip_tags
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action

from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.db.models.query_utils import Q
from django.contrib.auth.tokens import default_token_generator

from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string

from onboarding.models import Package, ContactForm, Page, Section, User, Answer, Company
from .forms import SignUpForm
from .serializers import PackageSerializer, PageSerializer, SectionSerializer, \
    ContactFormTestSerializer, UserSerializer, AnswerSerializer, CompanySerializer
from .tokens import account_activation_token


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
        user.is_active = True
        user.save()
        login(request, user)
        user.company.name = 'Null'
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()

            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)

            current_site = get_current_site(request)
            subject = 'Rejestracja w Online Onboarding '
            html_message = render_to_string('templated_email/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            plain_message = strip_tags(html_message)
            from_email = 'onlineonboardingnet@gmail.com'
            to = form.cleaned_data.get('email')

            mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)

            return HttpResponse(
                'Please confirm your email address to complete the registration'
            )

    else:
        form = SignUpForm()
    return render(request, 'bootstrap/auth-signup.html', {'form': form})


def password_reset_request(request):

    if request.method == "POST":
        password_reset_form = PasswordResetForm(request.POST)  # bazowy formulam maila
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    subject = "Zmiana hasła"
                    html_message = render_to_string(
                        'templated_email/password_reset_email.html', {
                            "email": user.email,
                            'domain': '127.0.0.1:8000',
                            'site_name': 'Website',
                            "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                            "user": user,
                            'token': default_token_generator.make_token(user),
                            'protocol': 'http',
                        }
                    )
                    plain_message = strip_tags(html_message)

                    try:
                        send_mail(subject, plain_message, 'admin@example.com', [user.email], fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect("/password_reset/done/")

    password_reset_form = PasswordResetForm()

    return render(
        request=request,
        template_name="registration/password_reset_form.html",
        context={
            "password_reset_form": password_reset_form
        }
    )


def reminder(request, employee_id, package_id):
    current_site = get_current_site(request)
    subject = 'Przypomnienie'
    # validacja?
    employee = User.objects.get(id=employee_id)
    package = Package.objects.get(id=package_id)
    html_message = render_to_string('templated_email/button_reminder.html', {
        'user': employee,
        'package': package,
        'domain': current_site.domain,

    })

    plain_message = strip_tags(html_message)
    from_email = 'onlineonboardingnet@gmail.com'
    to = employee.email

    mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)
    return HttpResponse(current_site)


@login_required
def manager_view(request):
    """View function for manager page of site."""
    return render(request, 'bootstrap/packages.html')


"""
REST
"""


# ViewSets define the view behavior.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ContactFormViewSet(viewsets.ModelViewSet):
    """
    List all packages, update or create a new package.
    """
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormTestSerializer


class PackageViewSet(viewsets.ModelViewSet):
    """
    List all package, or create a new package.
    """
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False)
    def list_by_user(self, request):
        """
        :param request: user
        :return: all packages with param request.user = owner
        """
        package = Package.objects.filter(owner=request.user)
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)


class PageViewSet(viewsets.ModelViewSet):
    """
    Page Model View Set
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True)
    def list_by_package(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(package__id=pk)
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True)
    def list_by_page(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(page__id=pk)
        serializer = SectionSerializer(section, many=True)

        return Response(serializer.data)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True)
    def list_by_section(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(section__id=pk)
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)


"""
Bootstrap part - test part
"""


def bootstrap_dashboard(request):
    return render(request, 'bootstrap/dashboard.html')


def bootstrap_packages(request):
    return render(request, 'bootstrap/packages.html')


def bootstrap_1_package(request):
    return render(request, 'bootstrap/package_page.html')


def bootstrap_forms(request):
    return render(request, 'bootstrap/package_forms.html')

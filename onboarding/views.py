from .tokens import account_activation_token
from django.contrib.auth.decorators import login_required
from django.core import mail
from django.utils.html import strip_tags
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import render, redirect
from django.core.mail import BadHeaderError
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
from onboarding.models import Package, ContactForm, Page, Section, User, \
    Answer, Company
from .forms import HrSignUpForm
from .serializers import PackageSerializer, PageSerializer, \
    SectionSerializer, ContactFormTestSerializer, UserSerializer, \
    AnswerSerializer, CompanySerializer


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
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


def signup(request):
    if request.method == 'POST':
        signup_form = HrSignUpForm(request.POST)
        if signup_form.is_valid():
            signup_form.save()

            email = signup_form.cleaned_data.get('email')
            raw_password = signup_form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)

            current_site = get_current_site(request)
            subject = 'Rejestracja w Online Onboarding '
            html_message = render_to_string(
                'templated_email/acc_active_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                })
            plain_message = strip_tags(html_message)
            from_email = 'onlineonboardingnet@gmail.com'
            to = signup_form.cleaned_data.get('email')

            mail.send_mail(subject, plain_message, from_email,
                           [to], html_message=html_message)

            return HttpResponse(
                'Please confirm your email address to complete the registration'
            )

    else:
        signup_form = HrSignUpForm()
    return render(request, 'bootstrap/auth-signup.html', {'form': signup_form})


def password_reset_request(request):
    if request.method == "POST":
        password_reset_form = PasswordResetForm(request.POST)
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
                        mail.send_mail(subject,
                                       plain_message,
                                       'admin@example.com',
                                       [user.email],
                                       html_message=html_message,
                                       fail_silently=False
                                       )
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

    mail.send_mail(subject, plain_message, from_email,
                   [to], html_message=html_message)
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

    @action(detail=False)
    def remove_user(self, request):
        user_email = request.user.email
        username = request.user.username
        request.user.email = 'removed'
        request.user.first_name = 'removed'
        request.user.last_name = 'removed'
        request.user.is_active = False
        request.user.save()

        subject = 'Usunięcie konta'

        html_message = render_to_string('templated_email/remove_acc_email.html', {
            'username': username,
        })

        plain_message = strip_tags(html_message)
        from_email = 'onlineonboardingnet@gmail.com'
        to = user_email

        mail.send_mail(subject, plain_message, from_email,
                       [to], html_message=html_message)

        return Response(status=204)


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
        serializer.save(owner=self.request.user.company)

    @action(detail=False)
    def list_by_company_hr(self, request):
        """
        :param request: user
        :return: all packages with param request.user = owner
        """
        package = Package.objects.filter(owner=request.user.company)
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)

    @action(detail=False)
    def list_by_company_employee(self, request):
        """
        :param request: user
        :return: all packages with param request.user = owner
        """
        package = Package.objects.filter(owner=request.user.company, users=request.user)
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def add_user_to_package(self, request, pk=None, user_id=None):
        # 1. czy pracownik wskazany po ID należy do danej firmy
        # 2. czy ten pracownik nie jest już przypisany do wskazanej paczki
        # 3. do wskazanej paczki dodać pracownika (z tej samej firmy)
        # 4. jeżeli dodanie przebiegło pomyślnie wysłać mail zgodnie z szablonem
        #
        # subject = 'odpowiedni temat maila'
        # html_message = render_to_string('templated_email/remove_acc_email.html', {
        #     dane w postaci słownika
        # })
        # plain_message = strip_tags(html_message)
        # from_email = 'onlineonboardingnet@gmail.com'
        # to = user_email - określamy do kogo wysłać maila
        #
        # mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message
        pass


class PageViewSet(viewsets.ModelViewSet):
    """
    Page Model View Set
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True)
    def list_by_package_hr(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(
            package__id=pk)  # add in the future ,owner__page=request.user.company
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def list_by_package_employee(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(package__id=pk,
                                   owner=self.request.user.company,
                                   package__users=self.request.user)
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)

    @action(detail=True)
    def list_by_page_hr(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(page__id=pk,
                                         owner=self.request.user.company)  # add in the future ,
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
        section = Section.objects.filter(page__id=pk,
                                         owner=self.request.user.company,
                                         page__package__users=self.request.user)
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
    def list_by_section_hr(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(section__id=pk,
                                       section__page_package__owner=self.request.user.company)
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def list_by_section_employee(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(section__id=pk,
                                       owner=self.request.user,
                                       section__page_package__user=self.request.user)
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

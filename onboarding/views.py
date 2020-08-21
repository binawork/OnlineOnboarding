from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action


from onboarding.models import Package, ContactForm, Page, Section, User, Answer
from .forms import SignUpForm
from .serializers import PackageSerializer, PageSerializer, SectionSerializer, \
    ContactFormTestSerializer, UserSerializer, AnswerSerializer


def index(request):
    """View function for home page of site."""
    return render(request, 'index.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return render(request, 'index.html')


    else:
        form = SignUpForm()
    return render(request, 'bootstrap/auth-signup.html', {'form': form})


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

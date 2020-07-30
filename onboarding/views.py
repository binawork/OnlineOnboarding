from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.exceptions import NotFound
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets

from .forms import SignUpForm
from django.shortcuts import render
from onboarding.models import Package, Email, User, Page
from rest_framework import generics
from .serializers import PackageSerializer, CreatePackageSerializer, AddEmailSerializer
# from .serializers import HyperLinkPackageSerializer, HyperLinkUserSerializer
from .serializers import AddNewPageToPackageSerializer, PagesListSerializer


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
    return render(request, 'bootstrap/package_page.html')


"""
REST
"""


# class PackageHyperLinkView(viewsets.ModelViewSet):  # test
#     queryset = Package.objects.all()
#     serializer_class = HyperLinkPackageSerializer
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
#
#
# class UserHyperLinkView(viewsets.ModelViewSet): # test
#     queryset = User.objects.all()
#     serializer_class = HyperLinkUserSerializer


class PackageListView(generics.ListAPIView):
    # serializer_class = PackageSerializer
    queryset = False

    def get(self, request):
        package = Package.objects.filter(owner=request.user)
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)


class PackageView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PackageSerializer
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        return Package.objects.filter()


class CreatePackageView(generics.CreateAPIView):
    serializer_class = CreatePackageSerializer
    queryset = Package.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AddEmailVew(generics.CreateAPIView):
    serializer_class = AddEmailSerializer
    queryset = Email.objects.all()


class AddNewPageToPackage(generics.GenericAPIView):  # todo: idk how i can do it
    # https://www.django-rest-framework.org/api-guide/serializers/#writing-create-methods-for-nested-representations
    # https://stackoverflow.com/questions/43853588/django-rest-framework-create-object-with-relationship-many-to-many

    serializer_class = AddNewPageToPackageSerializer


class PageListByPackageIdView(generics.ListAPIView):  # todo: this queryset its ok?
    serializer_class = PagesListSerializer
    # lookup_url_kwarg = 'pk'

    def get_queryset(self):
        queryset = Page.objects.filter(package__id=self.kwargs['pk'], package__owner=self.request.user)
        return queryset


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


from django.contrib.auth import login, authenticate
from rest_framework.response import Response

from .forms import SignUpForm, CreatePackageForm
from django.shortcuts import render
from django.views import generic
from onboarding.models import Package, Page
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from .serializers import PackageSerializer, CreatePackageSerializer


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


class ListOfPackage(LoginRequiredMixin, generic.ListView):
    """Generic class-based view listing books on loan to current user."""
    model = Package
    template_name = 'manager/base_manager.html'

    def get_queryset(self):
        return Package.objects.filter(owner=self.request.user)


def manager_view(request):
    """View function for manager page of site."""
    package_list_by_user = Package.objects.filter(owner=request.user)

    if request.method == 'POST':
        form = CreatePackageForm(request.POST)
        if form.is_valid():
            package = form.save()
            package.owner = request.user
            package.save()

            add_package_form = CreatePackageForm()
            context = {
                'add_package_form': add_package_form,
                'package_list_by_user': package_list_by_user,
            }
            return render(request, 'bootstrap/package_page.html', context=context)

    else:
        add_package_form = CreatePackageForm()
        context = {
            'add_package_form': add_package_form,
            'package_list_by_user': package_list_by_user,
        }
        return render(request, 'bootstrap/package_page.html', context=context)  # prevoius: manager/base_manager.html


def package_view(request, pk):
    data = Page.objects.filter(package__id=pk)
    context = {"data": data}

    return render(request, 'manager/package.html', context=context)


def page_view(request, pk):
    data = Page.objects.filter(package__id=pk)
    context = {"data": data}

    return render(request, 'manager/page.html', context=context)


"""
REST
"""


class PackageListView(ListAPIView):
    # serializer_class = PackageSerializer
    queryset = False

    def get(self, request):
        snippets = Package.objects.filter(owner=request.user)
        serializer = PackageSerializer(snippets, many=True)

        return Response(serializer.data)


class PackageView(RetrieveUpdateDestroyAPIView):
    serializer_class = PackageSerializer
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        return Package.objects.filter()


class CreatePackageView(CreateAPIView):
    serializer_class = CreatePackageSerializer
    queryset = Package.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


"""
Bootstrap part
"""


def bootstrap_dashboard(request):
    return render(request, 'bootstrap/dashboard.html')


def bootstrap_packages(request):
    return render(request, 'bootstrap/packages.html')


def bootstrap_1_package(request):
    return render(request, 'bootstrap/package_page.html')

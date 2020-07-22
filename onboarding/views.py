from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .forms import SignUpForm
from django.shortcuts import render
from onboarding.models import Package, Email
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, ListCreateAPIView
from .serializers import PackageSerializer, CreatePackageSerializer, AddEmailToPackageSerializer
from rest_framework import filters, viewsets


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
    """View function for manager page of site.
    """

    return render(request, 'bootstrap/package_page.html')

# class ListOfPackage(LoginRequiredMixin, generic.ListView):
#     " ""Generic class-based view listing books on loan to current user."" "
#     model = Package
#     template_name = 'manager/base_manager.html'
#
#     def get_queryset(self):
#         return Package.objects.filter(owner=self.request.user)


# def package_view(request, pk):
#     data = Page.objects.filter(package__id=pk)
#     context = {"data": data}
#
#     return render(request, 'manager/package.html', context=context)
#
#
# def page_view(request, pk):
#     data = Page.objects.filter(package__id=pk)
#     context = {"data": data}
#
#     return render(request, 'manager/page.html', context=context)

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


class PackageView(RetrieveUpdateDestroyAPIView):  # todo: should delete all relation (pages, email, etc.)?
    serializer_class = PackageSerializer
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        return Package.objects.filter()


class CreatePackageView(CreateAPIView):
    serializer_class = CreatePackageSerializer
    queryset = Package.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AddEmailToPackageView(CreateAPIView):
    queryset = Email.objects.all()
    serializer_class = AddEmailToPackageSerializer
    # lookup_url_kwarg = 'package_pk'

    def get_queryset(self):
        queryset = Email.objects.all()
        package_id = self.kwargs.get('package_pk', None)
        if package_id is not None:
            queryset = queryset.filter(package__id=package_id)
        return queryset

    def perform_create(self, serializer):
        package_id = self.kwargs.get('package_pk', None)
        try:
            package = Package.objects.get(id=package_id)
        except Package.DoesNotExist:
            raise NotFound()
        serializer.save(email=package)


"""
Bootstrap part - test part
"""


def bootstrap_dashboard(request):
    return render(request, 'bootstrap/dashboard.html')


def bootstrap_packages(request):
    return render(request, 'bootstrap/packages.html')


def bootstrap_1_package(request):
    return render(request, 'bootstrap/package_page.html')



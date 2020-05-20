from django.contrib.auth import login, authenticate
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse
from django.views.generic import CreateView

from .forms import SignUpForm, CreatePackageForm
from django.shortcuts import render
from django.views import generic
from onboarding.models import Package, Page
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.


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
    return render(request, 'registration/register.html', {'form': form})


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
            form.cleaned_data['owner'] = request.user.id  # Todo: add author this Package
            form.save()

            add_package_form = CreatePackageForm()
            context = {
                'add_package_form': add_package_form,
                'package_list_by_user': package_list_by_user,
            }
            return render(request, 'manager/base_manager.html', context=context)

    else:
        add_package_form = CreatePackageForm()
        context = {
            'add_package_form': add_package_form,
            'package_list_by_user': package_list_by_user,
        }
        return render(request, 'manager/base_manager.html', context=context)


def add_page_view(request):
    pass
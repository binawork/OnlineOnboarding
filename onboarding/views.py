from django.contrib.auth import login, authenticate
from django.shortcuts import redirect
from django.views.generic import CreateView

from .forms import SignUpForm
from django.shortcuts import render
from django.views import generic
from onboarding.models import Package
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
            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'registration/register.html', {'form': form})


class ListOfPackage(LoginRequiredMixin, generic.ListView):
    """Generic class-based view listing books on loan to current user."""
    model = Package
    template_name = 'manager/base_manager.html'

    def get_queryset(self):
        return Package.objects.filter(owner=self.request.user)


class PackageCreate(CreateView):
    model = Package
    fields = '__all__'
    template_name = 'manager/create_package.html'

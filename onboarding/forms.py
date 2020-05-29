from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Page, Package


class SignUpForm(UserCreationForm):
    company_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'company_name', 'email', 'password1', 'password2', )


class CreatePackageForm(forms.ModelForm):
    """
    if owner field is hidden user can change html for add other user
    """
    class Meta:
        model = Package
        fields = ('title',)

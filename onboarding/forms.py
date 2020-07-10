from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import Page, Package


class SignUpForm(UserCreationForm):
    company_name = forms.CharField(max_length=30, required=False, help_text='Optional.', widget=forms.TextInput(attrs={'class':'form-control'}) )
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.', widget=forms.EmailInput(attrs={'class':'form-control'}))

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

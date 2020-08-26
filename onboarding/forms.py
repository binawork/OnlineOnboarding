from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Company


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254,
                             help_text='Required. Inform a valid email address.',
                             widget=forms.EmailInput(
                                 attrs={'class': 'form-control'}
                             ))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2',)

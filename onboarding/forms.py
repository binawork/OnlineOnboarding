from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Company


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254,
                             help_text='Required. Inform a valid email address.',
                             widget=forms.EmailInput(
                                 attrs={'class': 'form-control'}
                             ))
    company_name = forms.CharField(max_length=500)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'company_name')

    def save(self, commit=True):
        user = super(SignUpForm, self).save(commit=False)

        user.company = Company.objects.create(name=self.cleaned_data["company_name"])

        if commit:
            user.save()
        return user


class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ('name',)

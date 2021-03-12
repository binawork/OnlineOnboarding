from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import SetPasswordForm
from django import forms
from django.core.exceptions import ValidationError
from .models import Company


class HrSignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254,
        help_text='Pole wymagane - podaj adres email.',
        widget=forms.EmailInput(attrs={'class': 'form-control'}))

    first_name = forms.CharField(label='Podaj imię',
        help_text='Pole wymagane - podaj swoje imię.',
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(label='Podaj nazwisko',
        help_text='Pole wymagane - podaj swoje nazwisko.',
        widget=forms.TextInput(attrs={'class': 'form-control'}))

    password1 = forms.CharField(label='Podaj hasło',
        help_text='''Hasło nie może być krótsze niż 8 znaków, zbyt łatwe do
        odgadnięcia, ani składać się wyłącznie z cyfr.''',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(label='Powtórz hasło',
        help_text='Hasła muszą być identyczne.',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    company_name = forms.CharField(max_length=500, label='Nazwa firmy',
        help_text='Pole wymagane - podaj nazwę firmy, w której pracujesz.',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = get_user_model()
        fields = (
                    'email',
                    'first_name',
                    'last_name',
                    'password1',
                    'password2',
                    'company_name'
        )



    # def get_or_create_company(self, company_name):
    #     company = Company.objects.filter(name=company_name).first()
    #     if not company:
    #         company = Company.objects.create(name=company_name)
    #     return company

    def save(self, commit=True):
        user = super(HrSignUpForm, self).save(commit=False)
        # user.company = self.get_or_create_company(
        #                                     self.cleaned_data["company_name"]
        # )
        user.company = Company.objects.create(name=self.cleaned_data["company_name"])

        user.is_hr = True
        user.username = self.cleaned_data['email']
        user.is_active = False
        if commit:
            user.save()
        return user


class CustomSetPasswordForm(SetPasswordForm):

    def clean(self):
        if self.user.date_left is not None:
            raise ValidationError('user is no longer in this company')

    def save(self, commit=True):
        user = super(CustomSetPasswordForm, self).save(commit)
        user.is_active = True
        user.save()
        return user

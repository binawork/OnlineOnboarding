import os
from django.db import models
from django.contrib.postgres.fields import JSONField  # Used to generate JSON in answers
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class Company(models.Model):
    name = models.TextField(max_length=500)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    how_many_sent_packages = models.IntegerField(default=1) 

    def __str__(self):
        return self.name


class CompanyQuestionAndAnswer(models.Model):
    """

    """
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    question = models.TextField(max_length=500)
    answer = models.TextField(max_length=500)


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user


def upload_to(instance, filename):
    """

    :param instance:
    :param filename:
    :return:
    """
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class User(AbstractUser):
    """

    """
    avatar = models.ImageField(_("Avatar"), upload_to=upload_to, blank=True)
    username = models.CharField(max_length=500, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    is_hr = models.BooleanField(default=False)
    email = models.EmailField(_('email address'), unique=True)

    phone_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    team = models.CharField(max_length=50, blank=True, null=True)
    job_position = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class ContactRequestDetail(models.Model):
    """

    """
    first_name = models.CharField(max_length=30, help_text='')
    last_name = models.CharField(max_length=30, help_text='')
    company_name = models.CharField(max_length=30, help_text='')
    email = models.EmailField(max_length=50, help_text='')
    text_field = models.CharField(max_length=500, help_text='')


class Package(models.Model):
    """
    Model representing Package
    Owner - Company that owns this package
    users - List of users connected to this package via HR
    """
    owner = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000, help_text='Enter a brief description', null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(User, related_name='users_package', blank=True)

    def __str__(self):
        return self.title


class Page(models.Model):
    """
    Model representing a through for Page and Section.
    Owner - Company that owns this package
    """
    package = models.ForeignKey(Package, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.IntegerField()
    owner = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True,)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description', null=True, blank=True)
    link = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    """
    Owner - Company that owns this package
    """
    page = models.ForeignKey(Page, on_delete=models.SET_NULL, null=True, blank=True)
    owner = models.ForeignKey(Company, null=True, blank=True, on_delete=models.SET_NULL)
    order = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description', null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    TYPES = [
        ('msa', 'Multi select answer'),
        ('osa', 'One select answer'),
        ('oa', 'Open answer'),
    ]
    data = JSONField(null=True, blank=True)

    type = models.CharField(
        max_length=3,
        choices=TYPES,
        blank=True,
        default='msa',
        help_text='Answer type',
    )

    def __str__(self):
        return self.title


class Answer(models.Model):
    """
    Owner - Company that owns this package
    """
    section = models.ForeignKey(Section, on_delete=models.SET_NULL, null=True, blank=True)
    data = JSONField(null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

# knowledge base

# 1. upload file
    # https://docs.djangoproject.com/en/3.1/topics/http/file-uploads/
    # https://www.django-rest-framework.org/api-guide/parsers/#fileuploadparser
# 2. email verification
    # https://medium.com/@frfahim/django-registration-with-confirmation-email-bb5da011e4ef
# 3. user can add page to any package not only from this user
    # https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
    # https://djangorestframework-queryfields.readthedocs.io/en/latest/
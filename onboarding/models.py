from django.db import models
from django.urls import reverse  # Used to generate URLs by reversing the URL patterns
import uuid  # Required for unique book instances
from django.contrib.postgres.fields import JSONField  # Used to generate JSON in answers

from django.contrib.auth.models import AbstractUser


class Company(models.Model):
    name = models.TextField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    how_many_sent_packages = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class User(AbstractUser):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)


class Email(models.Model):
    """Model representing users who are want test etc this app"""
    email = models.EmailField(max_length=254)


class Answer(models.Model):
    data = JSONField()


class Section(models.Model):
    order = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description', null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    TYPES = [
        ('msa', 'Multi select answer'),
        ('osa', 'One select answer'),
        ('oa', 'Open answer'),
    ]
    data = JSONField()

    type = models.CharField(
        max_length=3,
        choices=TYPES,
        blank=True,
        default='msa',
        help_text='Answer type',
    )

    def __str__(self):
        return self.title


class SectionsAnswer(models.Model):
    """Model representing a through for Section and Answer."""
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    sections = models.ForeignKey(Section, on_delete=models.CASCADE)


class Page(models.Model):
    """Model representing a through for Page and Section."""
    order = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description', null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    sections = models.ManyToManyField(Section, through='PageSections', blank=True)

    def __str__(self):
        return self.title


class PageSections(models.Model):
    """Model representing a through for Page and Section."""
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    sections = models.ForeignKey(Section, on_delete=models.CASCADE)


class Package(models.Model):
    """Model representing a Package."""
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000, help_text='Enter a brief description', null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    pages = models.ManyToManyField(Page, related_name='page_package', through='PackagePage', blank=True)
    users = models.ManyToManyField(User, related_name='users_package', blank=True)

    def __str__(self):
        return self.title


class PackagePage(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)


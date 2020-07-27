from django.db import models
from django.urls import reverse  # Used to generate URLs by reversing the URL patterns
from django.contrib.auth.models import User
import uuid  # Required for unique book instances
from django.contrib.postgres.fields import JSONField  # Used to generate JSON in answers


class Email(models.Model):
    """Model representing users who are want test etc this app"""
    email = models.EmailField(max_length=254)


class Answer(models.Model):
    data = JSONField()
    uuid = models.UUIDField(primary_key=False, editable=False)


class Section(models.Model):
    link = models.URLField()
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description')
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


class SectionsAnswer(models.Model):
    """Model representing a through for Section and Answer."""
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    sections = models.ForeignKey(Section, on_delete=models.CASCADE)
    order = models.IntegerField()


class Page(models.Model):
    """Model representing a through for Page and Section."""
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description')
    link = models.URLField()
    sections = models.ManyToManyField(Section, through='PageSections', blank=True)

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        return reverse('borrow', args=[str(self.id)])

    def __str__(self):
        """String for representing the Model object."""
        return self.title


class PageSections(models.Model):
    """Model representing a through for Page and Section."""
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    sections = models.ForeignKey(Section, on_delete=models.CASCADE)
    order = models.IntegerField()


class Package(models.Model):
    """Model representing a Package."""
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000, help_text='Enter a brief description')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    pages = models.ManyToManyField(Page, through='PackagePage', blank=True)
    users = models.ManyToManyField(User, related_name='package_users', blank=True)

    def get_absolute_url(self):
        """Returns the url to access a particular package instance."""
        print(str(self.id))
        return reverse('page', args=['/package/'+str(self.id)])

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.title} ,  {self.description},  {self.id}'


class PackagePage(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    order = models.IntegerField()



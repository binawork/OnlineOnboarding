from django.db import models
from django.urls import reverse  # Used to generate URLs by reversing the URL patterns
from django.contrib.auth.models import User
import uuid  # Required for unique book instances
# Create your models here.


class Email(models.Model):
    """Model representing a user"""
    email = models.EmailField(max_length=254)
    name = models.CharField(max_length=200)

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.name} ,  {self.email}'


class Page(models.Model):

    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1500, help_text='Enter a brief description')

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        return reverse('borrow', args=[str(self.id)])

    def __str__(self):
        """String for representing the Model object."""
        return self.title


class Package(models.Model):
    """Model representing a Package."""
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000, help_text='Enter a brief description')
    pages = models.ManyToManyField(Page)
    email = models.ManyToManyField(Email, through='Status', blank=True)

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        print('index', str(self.id))
        print(reverse('index', args=[str(self.id)]))
        return reverse('index', args=[str(self.id)])

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.title} ,  {self.description},  {self.id}'


class Status(models.Model):
    uuid = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)
    email = models.ForeignKey(Email, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)

    STATUS = [
        ('s', 'sent'),
        ('d', 'done'),
    ]

    status = models.CharField(
        max_length=1,
        choices=STATUS,
        blank=True,
        default='s',
        help_text='user status',
    )
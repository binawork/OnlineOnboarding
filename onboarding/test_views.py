from unittest import TestCase

from django.test import Client, TestCase
import os

from onboarding.models import User


class RegisterTests(TestCase):

    def test_1(self):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        client = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        response = client.post('http://127.0.0.1:8000/signup', data={
            'email': 'eejdzent@gmail.com',
            'first_name': "Adam",
            'last_name': "Janek",
            'password1': 'zibbEeYRw4DvG9U',
            'password2': 'zibbEeYRw4DvG9U',
            'company_name': "company test",
        })

        self.assertEqual(b'Please confirm your email address to complete the registration', response.content)
        self.assertEqual(200, response.status_code)

    def test_2(self):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        client = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        response = client.post('http://127.0.0.1:8000/signup', data={
            'email': 'eaejdzent@gmail.com',
            'first_name': "Adam",
            'last_name': "Janek",
            'password1': 'zibbEeYRw4DvG9U',
            'password2': 'zibbEeYRw4DvG9U',
            'company_name': "",
        })

        self.assertEqual(b'Please confirm your email address to complete the registration', response.content)
        self.assertEqual(200, response.status_code)


class TestAddUserToPackageViewSet(TestCase):
    def test_add_user_to_package(self):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        client = Client()
        response = client.post('http://127.0.0.1:8000/', data={
            'email': 'eaejdzent@gmail.com',
            'first_name': "Adam",
            'last_name': "Janek",
            'password1': 'zibbEeYRw4DvG9U',
            'password2': 'zibbEeYRw4DvG9U',
            'company_name': "",
        })

        self.assertEqual(b'Please confirm your email address to complete the registration', response.content)
        self.assertEqual(200, response.status_code)


class PackageViewTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        user = User.objects.create(username='john@example.com');
        user.set_password('secret')
        user.save()

        cls.user = user

        cls.client = Client()
        # cls.client.login(username='john@example.com', password='secret')

    """@classmethod
    def setUpTestData(cls):
        user = User.objects.create(username='john@example.com');
        user.set_password('secret')
        user.save()

        cls.user = user"""

    """@classmethod
    def tearDownClass(cls):
        User.objects.all().delete()
        super().tearDownClass()"""

    def test_access_get(self):
        logged_user = self.client.login(username=self.user.username, password='secret')
        self.assertTrue(logged_user)

        response = self.client.get('/api/package/')
        self.assertEqual(200, response.status_code)


# knowledge base

# https://docs.djangoproject.com/en/3.2/topics/testing/tools/;
# run to keep database from local_settings: python manage.py test --keepdb


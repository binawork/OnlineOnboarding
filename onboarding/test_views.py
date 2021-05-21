from unittest import TestCase

from django.test import Client, TestCase
import os

from onboarding.models import User, Company


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

        email = 'john@example.com'
        cls.client = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        response = cls.client.post('/signup', data={
            'email': email,
            'first_name': "John",
            'last_name': "Doe",
            'password1': 'secret_0',
            'password2': 'secret_0',
            'company_name': "Company Inc.",
        })

        user = User.objects.get(username=email)
        user.is_active = True
        user.save()
        cls.user = user
        cls.company = Company.objects.all().first()

        user_1 = User.objects.create(username='james@example.com')
        user_1.set_password('secret_1')
        user_1.save()
        #cls.user = user

        # cls.client.login(username='john@example.com', password='secret_0')

    """@classmethod
    def setUpTestData(cls):
        user = User.objects.create(username='john@example.com');
        user.set_password('secret_0')
        user.save()

        cls.user = user"""

    """@classmethod
    def tearDownClass(cls):
        User.objects.all().delete()
        super().tearDownClass()"""

    def test_access_get(self):
        logged_user = self.client.login(username=self.user.username, password='secret_0')
        # logged_user = self.client.force_login(self.user)  didn't work;
        self.assertTrue(logged_user)

        response = self.client.get('/api/package/')
        self.assertEqual(200, response.status_code)


# knowledge base

# https://docs.djangoproject.com/en/3.2/topics/testing/tools/;
# run to keep database from local_settings: python manage.py test --keepdb


from unittest import TestCase

from django.test import Client, TestCase
import os


class RegisterTests(TestCase):

    def test_1(self):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        client = Client()
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

        client = Client()
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

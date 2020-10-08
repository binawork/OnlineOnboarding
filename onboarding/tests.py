from django.test import Client
from django.test import SimpleTestCase, TestCase
import os


class QuestionModelTests(TestCase):

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

        self.assertEqual('aa', response.content)
        self.assertEqual(200, response.status_code)

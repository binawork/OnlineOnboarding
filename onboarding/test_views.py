from unittest import TestCase

from django.test import Client, TestCase
import os

from onboarding.models import User, Company, Package, PackagesUsers


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

        client = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
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


def create_user(username, name, last_name, password, is_hr):
    user = User.objects.create(username=username, first_name=name, last_name=last_name)
    user.set_password(password)
    user.email = username
    user.is_hr = is_hr
    user.is_active = True
    return user


class PackagesUsersTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        cls.company_A = Company.objects.create(name='Company A')
        cls.username_1 = "user_1@example.com"
        cls.password_1 = "secret_1"
        cls.user_1_A = create_user(cls.username_1, "Name", "Surname", cls.password_1, True)
        cls.user_1_A.company = cls.company_A
        cls.user_1_A.save()

        cls.company_B = Company.objects.create(name='Company B')
        cls.username_2 = "user_2@example.com"
        cls.password_2 = "secret_2"
        cls.user_1_B = create_user(cls.username_2, "Name2", "Surname2", cls.password_2, True)
        cls.user_1_B.company = cls.company_B
        cls.user_1_B.save()

        cls.username_3 = "user_3@example.com"
        cls.password_3 = "secret_3"
        cls.user_2_A = create_user(cls.username_3, "Name3", "Surname3", cls.password_3, False)
        cls.user_2_A.company = cls.company_A
        cls.user_2_A.save()

        cls.username_4 = "user_4@example.com"
        cls.password_4 = "secret_4"
        cls.user_2_B = create_user(cls.username_4, "Name4", "Surname4", cls.password_4, False)
        cls.user_2_B.company = cls.company_B
        cls.user_2_B.save()

        cls.package_1_A = Package.objects.create(owner=cls.company_A, title='Package 1 A', description='Description 1 A')
        cls.package_1_A.save()

        cls.package_2_A = Package.objects.create(owner=cls.company_A, title='Package 2 A', description='Description 2 A')
        cls.package_2_A.save()

        cls.package_1_B = Package.objects.create(owner=cls.company_B, title='Package 1 B', description='Description 1 B')
        cls.package_1_B.save()

        cls.package_2_B = Package.objects.create(owner=cls.company_B, title='Package 2 B', description='Description 2 B')
        cls.package_2_B.save()

    def test_packages_users_is_unique(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        try:
            self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
            self.fail("Package has to be unique for each user (company A)")
        except:
            pass

        self.package_1_B.users.add(self.user_2_B, through_defaults={'package_sender': self.user_1_B})
        self.package_2_B.users.add(self.user_2_B, through_defaults={'package_sender': self.user_1_B})

        try:
            self.package_1_B.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_B})
            self.fail("Package has to be unique for each user (company B)")
        except:
            pass

    def test_packages_users_remove_and_add(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        try:
            self.package_1_A.users.remove(self.user_2_A)
            self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        except:
            self.fail("Package has to be able to add after removing! (company A)")

    def test_new_package_can_be_added(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        
        try:
            self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        except:
            self.fail("User-Package relation which does not exists should be created! (company A)")

    """def test_foreign_user_can_not_be_added(self):
        client = Client()
        logged_user = client.login(username=self.username_1, password=self.password_1)
        self.assertTrue(logged_user)

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        user = create_user("user_5@example.com", "Name5", "Surname5", "secret_5", False)
        user.company = self.company_A
        user.save()

        url = "/api/add_users_to_package/{}/add_user_to_package/".format(self.package_1_A.id)
        response = client.post(url, {
            'users': [user.id]
        })
        self.assertTrue(200 <= response.status_code < 300)

        response = client.post(url, {
            'users': [self.user_2_B.id]
        })


        count = self.package_1_A.users.all().count()
        self.assertEqual(count, 2)"""


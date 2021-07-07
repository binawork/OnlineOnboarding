from unittest import TestCase, skip

from django.test import Client, TestCase
import os

from onboarding.models import User, Company, Package, PackagesUsers, Page


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


class LoginLimitTests(TestCase):
    """ Class testing the limit (here 2) of login in by the same user.

    One user is registered in and his credentials are used to attempt another logins
    like from another devices.

    A login() method from Client() class is not used because it has another logic -
    - it doesn't create a session which is needed to limit logins.
    A method .post() is used here instead;

    All POST requests include the same credentials which simulates e.g.
    the same user but another devices.
    """

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineOnboarding.settings')

        cls.username_1 = "john@example.com"
        cls.password_1 = "secret_0"
        cls.client = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        response = cls.client.post('/signup', data={
            'email': cls.username_1,
            'first_name': "John",
            'last_name': "Doe",
            'password1': cls.password_1,
            'password2': cls.password_1,
            'company_name': "Company Inc.",
        })

        cls.company_1 = None
        try:
            user = User.objects.get(username=cls.username_1)
            user.is_active = True
            cls.company_1 = Company.objects.all().first()
        except User.DoesNotExist:
            company = Company.objects.create(name='Company Inc.')
            user = create_user(cls.username_1, "John", "Doe", cls.password_1, True)
            user.company = company
            cls.company_1 = company

        user.save()
        cls.user = user

    def test_single_login(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        self.client.get('/accounts/logout/')

    def test_double_login(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client()
        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        self.client.get('/accounts/logout/')
        client_session_2.get('/accounts/logout/')

    """
    @skip("client.login()  has another logic than  client.post('...login/')")
    def test_triple_login(self):
        logged_user = self.client.login(username=self.username_1, password=self.password_1)
        self.assertTrue(logged_user)

        client_session_2 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        client_session_3 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        logged_user_2 = client_session_2.login(username=self.username_1, password=self.password_1)
        self.assertTrue(logged_user_2)

        logged_user_3 = client_session_3.login(username=self.username_1, password=self.password_1)
        self.assertFalse(logged_user_3)
    """

    def test_triple_login(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        client_session_3 = Client()

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        self.client.get('/accounts/logout/')
        client_session_2.get('/accounts/logout/')

    def test_double_login_first_logout_3rd_login(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client()
        client_session_3 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        self.client.get('/accounts/logout/')

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)
        # self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        client_session_2.get('/accounts/logout/')
        client_session_3.get('/accounts/logout/')

    def test_double_login_3rd_login_first_logout_3rd_relogin(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client()
        client_session_3 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        self.client.get('/accounts/logout/')

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        client_session_2.get('/accounts/logout/')
        client_session_3.get('/accounts/logout/')

    def test_double_login_second_logout_3rd_login(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client()
        client_session_3 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        client_session_2.get('/accounts/logout/')

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        self.client.get('/accounts/logout/')
        client_session_3.get('/accounts/logout/')

    def test_double_login_3rd_login_second_logout_3rd_relogin(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client()
        client_session_3 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        client_session_2.get('/accounts/logout/')

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        self.client.get('/accounts/logout/')
        client_session_3.get('/accounts/logout/')

    def test_double_login_3rd_login_twice_fail(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        client_session_3 = Client()

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        self.client.get('/accounts/logout/')
        client_session_2.get('/accounts/logout/')

    def test_double_login_3rd_and_4th_login_fail(self):
        response = self.client.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response.status_code >= 400)

        client_session_2 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')
        client_session_3 = Client()
        client_session_4 = Client(HTTP_ACCEPT_LANGUAGE='en-US,en;q=0.5')

        response_2 = client_session_2.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertFalse(response_2.status_code >= 400)

        response_3 = client_session_3.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_3.status_code >= 400)
        self.assertTemplateUsed(response_3, 'registration/login_limit_exceeded.html')

        response_4 = client_session_4.post('/accounts/login/', data={'username': self.username_1, 'password': self.password_1})
        self.assertTrue(response_4.status_code >= 400)
        self.assertTemplateUsed(response_4, 'registration/login_limit_exceeded.html')

        self.client.get('/accounts/logout/')
        client_session_2.get('/accounts/logout/')


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
        cls.max_package_id = cls.package_2_B.pk

    def test_packages_users_is_unique(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        try:
            self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
            self.fail("Package has to be unique for each user (company A)")
        except:
            pass
        else:
            self.fail("Package has to be unique for each user (company A)")

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

    @skip("IntegrityError  might not be exception of'ask for forgiveness' principle")
    def test_else_statement_should_not_run(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        try:
            self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        except:  # IntegrityError
            pass
        else:
            self.fail("'else' statement should not be executed when one tries to add not unique package for user! (company A)")

    @skip("IntegrityError  might not be exception of'ask for forgiveness' principle")
    def test_false_statement_should_not_run(self):
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        self.package_2_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        fail_case = True
        try:
            self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        except:  # IntegrityError
            fail_case = False

        if fail_case:
            self.fail("'fail-case' statement should not be executed when one tries to add not unique package for user! (company A)")

    def test_prefetch_related_assertion(self):
        user_ids = [self.user_1_A.pk, self.user_2_A.pk]
        users_filter = User.objects.filter(id__in=user_ids, is_hr=False)

        p_id = self.package_1_A.id
        package = None
        try:
            package = Package.objects.prefetch_related('users').filter(pk=p_id, users__in=users_filter).get()
            self.fail("Prefetch-related filter for package should not return any value!")
        except:
            pass

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        try:
            package = Package.objects.prefetch_related('users').filter(pk=p_id, users__in=users_filter).get()
        except:
            self.fail("Prefetch-related filter for package should return a value!")

    def test_prefetch_related_assertion_for_users_empty_list(self):
        user_ids = [self.user_1_A.pk]
        users_filter = User.objects.filter(id__in=user_ids, is_hr=False)

        p_id = self.package_1_A.id
        package = None
        try:
            package = Package.objects.prefetch_related('users').filter(pk=p_id, users__in=users_filter).get()
            self.fail("Prefetch-related filter for package should not return any value!")
        except:
            pass

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        try:
            package = Package.objects.prefetch_related('users').filter(pk=p_id, users__in=users_filter).get()
            self.fail("Prefetch-related filter for package should not return a value!")
        except:
            pass

    def test_exclude_users_in_package(self):
        p_id = self.package_1_A.id
        user_ids = [self.user_1_A.pk, self.user_2_A.pk]

        package = Package.objects.prefetch_related('users').get(pk=p_id)
        users = User.objects.filter(id__in=user_ids, is_hr=False).exclude(id__in=package.users.all())
        self.assertTrue(users.exists())

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        package = Package.objects.prefetch_related('users').get(pk=p_id)
        users = User.objects.filter(id__in=user_ids, is_hr=False).exclude(id__in=package.users.all())
        self.assertFalse(users.exists())

    def test_exclude_empty_list_of_users_in_package(self):
        p_id = self.package_1_A.id
        user_ids = [self.user_1_A.pk]

        package = Package.objects.prefetch_related('users').get(pk=p_id)
        users = User.objects.filter(id__in=user_ids, is_hr=False).exclude(id__in=package.users.all())
        self.assertFalse(users.exists())

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        package = Package.objects.prefetch_related('users').get(pk=p_id)
        users = User.objects.filter(id__in=user_ids, is_hr=False).exclude(id__in=package.users.all())
        self.assertFalse(users.exists())

    def test_exclude_users_in_none_package(self):
        p_id = None  # self.max_package_id + 1
        user_ids = [self.user_1_A.pk, self.user_2_A.pk]

        try:
            package = Package.objects.prefetch_related('users').get(pk=p_id)
        except:
            pass
        else:
            users = User.objects.filter(id__in=user_ids, is_hr=False, company=self.user_1_A.company).exclude(id__in=package.users.all())
            self.assertTrue(users.exists())

        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})
        try:
            package = Package.objects.prefetch_related('users').get(pk=p_id)
        except:
            pass
        else:
            users = User.objects.filter(id__in=user_ids, is_hr=False, company=self.user_1_A.company).exclude(id__in=package.users.all())
            self.assertFalse(users.exists())

    def test_package_sender_selection_by_page_and_user(self):
        """
        Testing request for package_sender by self.user_2_A, and page;
        """
        page = Page.objects.create(package=self.package_1_A, owner=self.company_A, title="Title 1", description="Description 1", order=1)
        self.package_1_A.users.add(self.user_2_A, through_defaults={'package_sender': self.user_1_A})

        try:
            page_check = Page.objects.select_related('package').get(pk=page.pk, package__users=self.user_2_A)
            package_user = PackagesUsers.objects.filter(user=self.user_2_A, package=page_check.package)
        except:
            self.fail("User - package relation missed but it should be for \"{}\" - \"{}\"!".format(self.user_2_A, self.package_1_A) )
        else:
            if package_user.count() < 1:
                self.fail("User - package relation missed but it should be for \"{}\" - \"{}\"!".format(self.user_2_A, self.package_1_A) )
            else:
                package_user = package_user.first()
                self.assertEqual(self.user_1_A, package_user.package_sender)

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


from django.core import mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text

from OnlineOnboarding.settings import EMAIL_HOST_USER

from .tokens import account_activation_token


class UserEmailCRUD():

    def send_to_user_created_by_hr(self, request, password, user):
        company = request.user.company
        user_email = request.data['email']
        # fist_name = request.data['first_name']
        # second_name = request.data['second_name']
        current_site = get_current_site(request)
        subject = f'Dodano Cię do onboardingu firmy {company}' 
                                            # eng. "You've been added 
                                            # to XYZ's onboarding"
        html_message = render_to_string(
            'templated_email/create_acc_email.html', 
            {
                'full_name': user_email,
                'company': company,
                'domain': current_site.domain,
                'password': password,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            }
        )
        plain_message = strip_tags(html_message)
        from_email = EMAIL_HOST_USER
        to = user_email
        print("BEEEEEFORE")
        mail.send_mail(
                        subject, 
                        plain_message, 
                        from_email,
                        [to], 
                        html_message=html_message,
        )
        print("AAAAAAAFTER")
from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from OnlineOnboarding.settings import EMAIL_HOST_USER


class UserEmailCRUD():

    def send_to_user_created_by_hr(self, request):
            company = request.user.company
            user_email = request.data['email']
            subject = f'Dodano Cię do onboardingu firmy {company}' 
                                                # eng. "You've been added 
                                                # to XYZ's onboarding"
            html_message = render_to_string(
                'templated_email/create_acc_email.html', 
                {
                    'username': user_email,
                    'company': company,
                }
            )
            plain_message = strip_tags(html_message)
            from_email = EMAIL_HOST_USER
            to = user_email
            mail.send_mail(
                            subject, 
                            plain_message, 
                            from_email,
                            [to], 
                            html_message=html_message,
            )

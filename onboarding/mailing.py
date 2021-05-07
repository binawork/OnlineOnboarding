from django.core import mail
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import BadHeaderError
from OnlineOnboarding.settings import EMAIL_HOST_USER


def send_activation_email_for_user_created_by_hr(user, current_site):
    subject = 'Rejestracja'  # eng. "password change"
    html_message = render_to_string(
        'templated_email/register_user_by_hr.html',
        {
            'domain': current_site,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'user': user,
            'token': default_token_generator.make_token(user),
            'protocol': 'http',
        }
    )

    plain_message = strip_tags(html_message)
    from_email = EMAIL_HOST_USER
    try:
        mail.send_mail(
            subject,
            plain_message,
            from_email,
            [user.email],
            html_message=html_message,
            fail_silently=False
        )
    except BadHeaderError:
        return HttpResponse('Invalid header found.')
    return redirect('/password_reset/done/')


def send_reminder_email(EMAIL_HOST_USER, employee, package):
    subject = "Przypomnienie"
    html_message = render_to_string(
        'templated_email/button_reminder.html',
        {
            'user': employee,
            'package': package,
        }
    )
    plain_message = strip_tags(html_message)
    from_email = EMAIL_HOST_USER
    to = employee.email
    mail.send_mail(
        subject,
        plain_message,
        from_email,
        [to],
        html_message=html_message,
    )


def send_add_user_to_package_email(EMAIL_HOST_USER, user, package):

    subject = f'Dodano użytkownika {user} do {package}'
    html_message = render_to_string(
        'templated_email/add_user_to_form.html',
        {
            "user": user,
            "package": package
        }
    )
    plain_message = strip_tags(html_message)
    from_email = EMAIL_HOST_USER
    to = user.email

    mail.send_mail(
        subject,
        plain_message,
        from_email,
        [to],
        html_message=html_message,
    )


def send_reask_user_for_page_email(EMAIL_HOST_USER, user, page, do_remind=False, is_Polish=True):
    subject = "Prośba o wypełnienie \"{page}\""
    html_message = render_to_string(
        'templated_email/ask_user_for_page.html',
        {
            "user": user,
            "title": page.title
        }
    )
    plain_message = strip_tags(html_message)

    mail.send_mail(subject, plain_message, EMAIL_HOST_USER, [user.email], html_message=html_message)


def send_remove_acc_email(EMAIL_HOST_USER, user_email):
    subject = 'Usunięcie konta'  # eng. "deletion of the account"

    html_message = render_to_string(
        'templated_email/remove_acc_email.html',
        {
            'username': user_email,
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


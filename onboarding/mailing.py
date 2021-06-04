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
from random import choice


def send_password_reset_email(user, current_site):
    image_frame = choice(["korytarz_600_x_230.jpg", "linie_600_x_230.jpg", "swiatlo_600_x_230.jpg", "woda_krople_600_x_230.jpg"])

    subject = 'Zmiana hasła' # eng. "password change"
    html_message = render_to_string(
        'templated_email/password_reset_email.html',
        {
            'email': user.email,
            'domain': current_site.domain, # to fix: should it be in local_settings.py bec. it is another on a server?
            # 'site_name': 'Website',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'user': user,
            'token': default_token_generator.make_token(user),
            'protocol': 'http',
            'image_frame': image_frame,
        }
    )

    plain_message = strip_tags(html_message)
    from_email = EMAIL_HOST_USER

    mail.send_mail(
        subject,
        plain_message,
        from_email,
        [user.email],
        html_message=html_message,
        fail_silently=False
    )


def send_activation_email_for_user_created_by_hr(user, current_site):
    image_frame = choice(["ona_zolte_tlo_600_x_230.jpg", "say_cheese_600_x_230.jpg", "on_laka_600_x_230.jpg", "on_las_600_x_230.jpg", "ona_blond_usmiech_600_x_230.jpg", "ona_usmiech_600_x_230.jpg"])

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


def send_reminder_email(subject, EMAIL_HOST_USER, employee, package, current_site):
    image_frame = choice(["napis_do_something_600_x_230.jpg", "napis_go_up_600_x_230.jpg", "napis_work_harder_600_x_230.jpg"])

    html_message = render_to_string(
        'templated_email/button_reminder.html',
        {
            'user': employee,
            'package': package,
            'domain': current_site.domain,
            'image_frame': image_frame,
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
    image_frame = choice(["budzik_reka_600_x_230.jpg", "budzik_tlo_600_x_230.jpg", "zegarek_reka_600_x_230.jpg"])

    subject = f'Dodano użytkownika {user} do {package}'
    html_message = render_to_string(
        'templated_email/add_user_to_form.html',
        {
            "user": user,
            "package": package,
            'image_frame': image_frame
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


def send_remove_user_from_package_email(EMAIL_HOST_USER, user, package):
    image_frame = choice(["recykling_600_x_230.jpg", "skasowane_600_x_230.jpg"])

    subject = f'Anulowanie {package}'
    html_message = render_to_string(
        'templated_email/remove_package_from_one_user.html',
        {
            "user": user,
            "package": package,
            'image_frame': image_frame
        }
    )
    plain_message = strip_tags(html_message)
    from_email = EMAIL_HOST_USER

    mail.send_mail(
        subject,
        plain_message,
        from_email,
        [user.email],
        html_message=html_message,
    )


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


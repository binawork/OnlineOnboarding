from django.contrib.sessions.models import Session
from django.contrib.auth import user_logged_in, user_logged_out
from django.dispatch import receiver
from .models import UserSessions


@receiver(user_logged_in)
def user_logged_in(sender, request, user, **kwargs):
    session = Session.objects.get(pk=request.session.session_key)
    UserSessions.objects.get_or_create(user=user, session=session)


@receiver(user_logged_out)
def user_logged_out(sender, request, user, **kwargs):
    pass

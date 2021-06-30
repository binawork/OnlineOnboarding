from django.contrib.auth import user_logged_in, user_logged_out
from django.dispatch import receiver


@receiver(user_logged_in)
def user_logged_in(sender, request, user, **kwargs):
	pass


@receiver(user_logged_out)
def user_logged_out(sender, request, user, **kwargs):
	pass

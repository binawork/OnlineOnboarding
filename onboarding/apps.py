from django.apps import AppConfig


class SystemConfig(AppConfig):
    name = 'onboarding'

    def ready(self):
        import onboarding.signals

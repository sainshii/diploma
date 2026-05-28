from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

    def ready(self):
        from django.conf import settings
        if settings.DEBUG:
            from rest_framework.authtoken.models import Token
            Token.objects.all().delete()
            print("Все токены удалены – пользователи будут вынуждены перелогиниться.")
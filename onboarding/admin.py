from django.contrib import admin
from .models import Package, Page, Email, Status

admin.site.register(Package)
admin.site.register(Page)
admin.site.register(Email)
admin.site.register(Status)

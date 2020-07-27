from django.contrib import admin
from .models import Package, Page, Section, Answer, Email
from django.contrib.auth.models import User

# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/


class PagePackageInline(admin.TabularInline):
    model = Package.pages.through


class UserPackageInline(admin.TabularInline):
    model = Package.users.through


class SectionsInline(admin.TabularInline):
    model = Page.sections.through


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'description', "created_on", "updated_on")
    list_filter = (
        ('owner', admin.RelatedOnlyFieldListFilter),
    )
    inlines = [PagePackageInline]


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    inlines = [PagePackageInline, SectionsInline]


admin.site.register(Section)
admin.site.register(Answer)
admin.site.register(Email)



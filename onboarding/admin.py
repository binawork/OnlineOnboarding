from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Package, Page, Section, Answer, Email


# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/
admin.site.register(User, UserAdmin)


class PagePackageInline(admin.TabularInline):
    model = Package.pages.through


class UserPackageInline(admin.TabularInline):
    model = Package.users.through


class SectionsInline(admin.TabularInline):
    model = Page.sections.through


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'description', "created_on", "updated_on",)
    list_filter = (
        ('owner', admin.RelatedOnlyFieldListFilter),
    )
    inlines = [PagePackageInline]
    inlines = [UserPackageInline]


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    inlines = [PagePackageInline, SectionsInline]


admin.site.register(Section)
admin.site.register(Answer)
admin.site.register(Email)



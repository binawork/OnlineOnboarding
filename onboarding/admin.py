from django.contrib import admin
from .models import Package, Page, Email, Section, PackagePage, PageSections, Answer, SectionsAnswer

# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/


class PagePackageInline(admin.TabularInline):
    model = Package.pages.through


class SectionsInline(admin.TabularInline):
    model = Page.sections.through


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'description', "created_on", "updated_on",)
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



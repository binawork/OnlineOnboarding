from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Package, Page, Section, Answer, ContactForm


# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/
admin.site.register(User, UserAdmin)


class PageInline(admin.StackedInline):
    model = Page


class SectionsInline(admin.StackedInline):
    model = Section


class AnswerInline(admin.StackedInline):
    model = Answer


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'title',  'description', "created_on", "updated_on",)
    inlines = [PageInline, ]
    ordering = ('id',)


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'order', 'owner', 'title', 'description', 'link')
    inlines = [SectionsInline]
    ordering = ('id',)


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'page', 'order', 'title', 'description', 'type', )
    ordering = ('id',)
    inlines = [AnswerInline, ]


admin.site.register(Answer)
admin.site.register(ContactForm)



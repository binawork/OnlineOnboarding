from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Package, Page, Section, Answer, Company, ContactRequestDetail

# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/
admin.site.register(User, UserAdmin)
admin.site.register(ContactRequestDetail)
admin.site.register(Company)


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('id','email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


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


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'section', 'owner', 'updated_on', 'confirmed')
    ordering = ('id',)






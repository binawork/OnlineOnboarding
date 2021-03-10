from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Package, Page, Section, Answer, Company, ContactRequestDetail

admin.site.register(ContactRequestDetail)
admin.site.register(Company)
# information about django administration site
# https://docs.djangoproject.com/en/3.0/ref/contrib/admin/


#for nice display for HR status of a User (for class below) - TBD
# def hr_display(usr):
#     return ("%s %s" % (usr.is_hr, obj.last_name)).upper()
# upper_case_name.short_description = 'Name'

class CustomUserAdmin(UserAdmin):
    '''custom panel for User is for convenience, since 'User' uses custom model'''

    model = User
    list_display = ('username', 'email', 'company', 'is_hr', 'is_superuser')
    list_filter = ('username', 'email', 'is_hr', 'is_staff', 'company', 'location')

    if User.is_superuser: #need to get instance of current User here - request?
    #not sure if all fields are required with superuser
        fieldsets = (
            ('General data', {'fields': ('email', 'username', 'phone_number',
                'location')}),
            ('Groups', {'fields': ('company', 'is_hr', 'team', 'job_position')}),
            ('Misc data', {'fields': ('avatar', 'date_left', 'welcome_board')}),
            ('Admin stuff', {'fields': ('is_active', 'is_staff')})
        )
    else:
        fieldsets = (
            ('General data', {'fields': ('email', 'username', 'phone_number',
                'location')}),
            ('Groups', {'fields': ('company', 'is_hr', 'team', 'job_position')}),
            ('Misc data', {'fields': ('avatar', 'date_left', 'welcome_board')}),
        )


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


admin.site.register(User, CustomUserAdmin)

#original CustomAdmin that was not registered (and probably uncompleted)
# class CustomUserAdmin(UserAdmin):
#     model = User
#     list_display = ('email', 'is_staff', 'is_active',)
#     list_filter = ('email', 'is_staff', 'is_active',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password', 'company')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active', 'is_hr')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('id','email', 'password1', 'password2', 'is_staff', 'is_active')}
#         ),
#     )
#     search_fields = ('email',)
#     ordering = ('email',)


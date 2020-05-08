from django.contrib import admin
from .models import Package, Page, Email, Status, Section, PackagePage, PageSections, Answer

admin.site.register(Package)
admin.site.register(Page)
admin.site.register(Email)
admin.site.register(Status)
admin.site.register(Section)
admin.site.register(PackagePage)
admin.site.register(PageSections)
admin.site.register(Answer)


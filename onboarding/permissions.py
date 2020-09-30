from rest_framework import permissions


class IsHrUser(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            has_perm = request.user.is_hr
        except AttributeError:
            return False
        else:
            return has_perm

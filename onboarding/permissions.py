from rest_framework import permissions


class IsHrUser(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            has_perm = request.user.is_hr
        except AttributeError:
            has_perm = False
        finally:
            return has_perm

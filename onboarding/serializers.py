from rest_framework import serializers
from onboarding.models import Package, Email, Page, Section

'''
Core arguments in serializer fields

read_only	    Set this to True to ensure that the field is used when serializing 
                a representation, but is not used when creating or updating an instance
                during deserialization

write_only  	Set this to True to ensure that the field may be used when updating or 
                creating an instance, but is not included when serializing the representation.

required    	Setting this to False also allows the object attribute or dictionary key to 
                be omitted from output when serializing the instance.

default	        If set, this gives the default value that will be used for the field if no 
                input value is supplied.

allow_null  	Normally an error will be raised if None is passed to a serializer field. 
                Set this keyword argument to True if None should be considered a valid value.

source	        The name of the attribute that will be used to populate the field.

validators	    A list of validator functions which should be applied to the incoming field input,
                and which either raise a validation error or simply return.

error_messages	A dictionary of error codes to error messages.

label	        A short text string that may be used as the name of the field in HTML form fields
                or other descriptive elements.

help_text	    A text string that may be used as a description of the field in HTML form fields
                or other descriptive  elements.

initial	        A value that should be used for pre-populating the value of HTML form fields.
'''


class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package
        fields = '__all__'


class CreatePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['title', 'description']


class AddEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Email
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class SectionsInPageSerializer(serializers.ModelSerializer):
    # sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = '__all__'


class SectionsInPagesInPackage(serializers.ModelSerializer):
    pages = SectionsInPageSerializer(many=True, read_only=True)

    class Meta:
        model = Package
        # fields = ("id", "pages", "title", "description", "created_on", "updated_on", "owner", "users", "pages")
        fields = '__all__'


class AddNewPageToPackageSerializer(serializers.ModelSerializer):
    package = PackageSerializer(many=True)

    class Meta:
        model = Page
        fields = ('package', 'id', 'title', 'description', 'link', 'sections')

    def create(self, validated_data):
        package_data = validated_data.pop('package')
        page = Page.objects.create(**validated_data)
        Package.objects.create(page=page, **package_data)
        return Page


# class HyperLinkUserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class HyperLinkPackageSerializer(serializers.HyperlinkedModelSerializer):
#     owner = serializers.HyperlinkedRelatedField(
#         many=True,
#         read_only=True,
#         view_name='user_test'
#     )
#     users = serializers.HyperlinkedRelatedField(
#         many=True,
#         read_only=True,
#         view_name='user_test'
#     )
#
#     extra_kwargs = {
#         'url': {'view_name': 'accounts', 'lookup_field': 'account_name'},
#         'users': {'lookup_field': 'username'}
#     }
#
#     class Meta:
#         model = Package
#         fields = '__all__'
#         fields = ['id', 'url', 'owner', 'title', 'description', 'pages', 'users', 'created_on']
#

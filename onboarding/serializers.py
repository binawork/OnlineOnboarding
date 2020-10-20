from rest_framework import serializers
from django.contrib.auth import get_user_model
from onboarding.models import ContactRequestDetail, Package, Page, Section, User
from onboarding.models import Answer, Company, CompanyQuestionAndAnswer
from . import mock_password

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


# Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class CompanyQuestionAndAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyQuestionAndAnswer
        fields = ('company', 'question', 'answer')


# USER
class UserAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'avatar']

    def save(self, *args, **kwargs):
        if self.instance.avatar:
            self.instance.avatar.delete()
        return super().save(**kwargs)


class UsersListSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'location',
            'team',
            'job_position',
            'last_login',

        )


class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = (
                    'email', 
                    'first_name',
                    'last_name',
                    )

    def create(self, validated_data):
        password = mock_password.generate()
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False,
        )
        user.set_password(password)
        user.save()
        return user, password


# CONTACT FORM
class ContactFormTestSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = ContactRequestDetail
        fields = (
                    'id', 
                    'first_name', 
                    'last_name', 
                    'company_name', 
                    'email', 
                    'text_field'
        )


# PACKAGE
class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = Package
        fields = (
                    'id', 
                    'title', 
                    'owner', 
                    'description', 
                    'created_on', 
                    'updated_on', 
                    'users'
        )


# PAGE
class PackageSpecialTestSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = Page
        fields = (
                    'id',
                    'order',
                    'owner',
                    'title',
                    'description',
                    'link',
                    'package',
        )
        extra_kwargs = {
            'package': {'required': False},
        }


# PAGE
class PageSerializer(serializers.ModelSerializer):
    # package = serializers.SlugRelatedField()
    # package = PackageSerializer()

    class Meta:
        ordering = ['-id']
        model = Page
        fields = (
                    'id',
                    'order',
                    'owner',
                    'title',
                    'description',
                    'link',
                    'package',
        )
        extra_kwargs = {
            'package': {'required': False},
        }


# SECTION
class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = Section
        fields = (
                    'id',
                    'order',
                    'title',
                    'description',
                    'link',
                    'type',
                    'data',
                    'page',
        )


# ANSWER
class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = Answer
        fields = (
                    'id',
                    'section',
                    'data',
                    'owner',
        )

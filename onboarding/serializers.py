from rest_framework import serializers
from onboarding.models import ContactForm, Package, Page, Section, User, Answer, Company

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


# USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


# CONTACT FORM
class ContactFormTestSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = ContactForm
        fields = ('id', 'first_name', 'last_name', 'company_name', 'email')


# PACKAGE
class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = Package
        fields = ('id', 'title', 'owner', 'description', 'created_on', 'updated_on', 'users')


# PAGE
class PackageSpecialTestSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = Page
        fields = ('id',
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


#PAGE
class PageSerializer(serializers.ModelSerializer):
    # package = serializers.SlugRelatedField()
    # package = PackageSerializer()

    class Meta:
        ordering = ['-id']
        model = Page
        fields = ('id',
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
        fields = ("id",
                  "order",
                  "title",
                  "description",
                  'link',
                  'type',
                  'data',
                  'page'
                  )


# ANSWER
class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        ordering = ['-id']
        model = Answer
        fields = ("id",
                  'section',
                  'data',
                  'owner'
                  )


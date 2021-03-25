from rest_framework import serializers
from django.contrib.auth import get_user_model
from onboarding.models import ContactRequestDetail, Package, Page, Section, User, PackagesUsers
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

'''
Some serializers have a hint-comment above what is this serializer for,
meaning which DB model or what relation. E.g.: #ANSWER, #PACKAGE etc.
'''

# Company
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CompanyFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id',
                  'company_logo',
                  )


class CompanyQuestionAndAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyQuestionAndAnswer
        fields = ('id', 'question', 'answer', 'order')


# USER
class UserJobDataSerializer(serializers.Serializer):
    location = serializers.ListField(child=serializers.CharField())

    # team = serializers.ListField(child=serializers.CharField())
    # job_position = serializers.ListField(child=serializers.CharField())

    class Meta:
        # model = get_user_model()
        fields = [
            'location',
            # 'team',
            # 'job_position',
        ]


class LogInUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'avatar',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'location',
            'team',
            'job_position',
            'last_login',
            'company_id',
            'welcome_board'
        ]


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
            'avatar',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'location',
            'team',
            'job_position',
            'last_login',
            # 'welcome_board'
        )


class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            'avatar',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'location',
            'team',
            'job_position',
            # 'welcome_board'
        )

    def create(self, validated_data):
        password = mock_password.generate()
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            location=validated_data['location'],
            team=validated_data['team'],
            job_position=validated_data['job_position'],
            is_active=False,
        )
        user.set_password(password)
        user.save()
        return user


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
            'description',
            'created_on',
            'updated_on',
            'users',
        )


class PackageUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackagesUsers
        fields = '__all__'


class PackageAddUsersSerializer(serializers.ModelSerializer):
    users = PackageUsersSerializer(source='packagesusers_set', many=True)

    class Meta:
        ordering = ['-id']
        model = Package
        fields = (
            'id',
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
            'updated_on',
            'package',
        )
        extra_kwargs = {
            'package': {'required': False},
        }


class PageLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-order']
        model = Page
        fields = (
            'id',
            'order',
            'owner',  # company
            'package',
        )
        extra_kwargs = {
            'package': {'required': False},
        }


# PACKAGE with PAGEs
class PackagePagesSerializer(serializers.ModelSerializer):
    page_set = PageSerializer(many=True)

    class Meta:
        ordering = ['-updated_on']
        model = Package
        fields = (
            'id',
            'title',
            'description',
            'created_on',
            'updated_on',
            'users',
            'page_set'
        )


class PackagePagesForUsersSerializer(serializers.ModelSerializer):
    pages = PageLimitedSerializer(source='page_set', many=True)

    class Meta:
        ordering = ['-updated_on']
        model = Package
        fields = (
            'id',
            'users',
            'pages'
        )


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

#TBD: double check if 'sections' are not duplicating (see: views.py,
#SectionViewSet, perform_create())
    # def validate(self, data):
    #     '''
    #     Prevents data in Section from duplicating from backend side (when data is
    #     re-send manually; problem was previously solved in frontend for the user).
    #     '''
    #     if Section.objects.filter(title = data['title'],
    #             description = data['description'],
    #             owner = self.context['request'].user.company).exists():
    #         raise serializers.ValidationError("Dane już istnieją w bazie - duplikat")
    #     return data


#ANSWER
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = Answer
        fields = (
            'id',
            'section',
            'data',
            'owner',
            'confirmed',
            'finished'
        )


class AnswersProgressStatusSerializer(serializers.ModelSerializer):
    # sen_on = serializers.ReadOnlyField(source='packageusers.send_on')

    class Meta:
        model = Answer
        fields = (
            'id',
            'updated_on',
            'confirmed',
            'finished',
        )


class WhenPackageSendToEmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = PackagesUsers
        fields = (
            'package',
            'send_on',
        )


# SECTION with ANSWERS
class SectionAnswersSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(source='answer_set', many=True, allow_null=True)

    class Meta:
        ordering = ['-order']
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
            'answers',
        )


class SectionProgressSerializer(serializers.ModelSerializer):
    # page = PageSerializer()
    package_id = serializers.SerializerMethodField()
    page_title = serializers.SerializerMethodField()
    company_id = serializers.SerializerMethodField()
    page_link = serializers.SerializerMethodField()
    page_updated = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = (
            'id',
            'title',
            'data',
            'page',
            'company_id',
            'package_id',
            'page_title',
            'page_link',
            'page_updated'
        )

    def get_package_id(self, obj):
        return obj.page.package_id
    def get_page_title(self, obj):
        return obj.page.title
    def get_company_id(self, obj):
        return obj.owner_id
    def get_page_link(self, obj):
        return obj.page.link
    def get_page_updated(self, obj):
        return obj.page.updated_on


class UserProgressSerializer(serializers.ModelSerializer):
    # section_set = SectionAnswersSerializer(many=True, allow_null=True)
    section = SectionProgressSerializer()
    # page = PageSerializer()
    # answer_set = AnswerSerializer(many=True, allow_null=True)

    class Meta:
        model = Answer
        fields = '__all__'
        # depth = 3
#


# Same as above but limited/less fields
class SectionProgressLimitedSerializer(serializers.ModelSerializer):
    # page = PageSerializer()
    package_id = serializers.SerializerMethodField()
    # company_id = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = (
            'id',
            'page',
            # 'company_id',
            'package_id'
        )

    def get_package_id(self, obj):
        return obj.page.package_id
    # def get_company_id(self, obj):
    #     return obj.owner_id


class UserProgressLimitedSerializer(serializers.ModelSerializer):
    section = SectionProgressLimitedSerializer()

    class Meta:
        model = Answer
        fields = (
            'id',
            'owner',
            'section',
            'confirmed',
            'finished'
        )
        # depth = 3
#


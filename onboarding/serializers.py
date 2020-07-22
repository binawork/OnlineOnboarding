from rest_framework import serializers
from onboarding.models import Package, Email


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'


class CreatePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['title', 'description']


class AddEmailToPackageSerializer(serializers.ModelSerializer):
    package = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Email
        fields = ("email", "name", "package")
        # extra_kwargs = {'package': {'required': True}}

    # def create(self, validated_data):
        #     package_data = validated_data.pop('package')
        #     email = Email.objects.create(**validated_data)
        #     Package.objects.create(email=email, **package_data)
        #     return email
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


class AddEmail(serializers.ModelSerializer):

    class Meta:
        model = Email
        fields = '__all__'
from rest_framework import serializers
from onboarding.models import Package


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'


class CreatePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['title', 'description']

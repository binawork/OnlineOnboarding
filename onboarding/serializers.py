from rest_framework import serializers
from onboarding.models import Package, Email
from django.contrib.auth.models import User


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


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')
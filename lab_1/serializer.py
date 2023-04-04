from django.db.models import Count
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, PrimaryKeyRelatedField, \
    IntegerField, CharField, DateField, ValidationError
from .models import *
from django.db.models import Avg
from rest_framework.validators import UniqueTogetherValidator


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'address', 'phone', 'age', 'tutor']

    def validate_email(self, email):
        if '@' not in email.lower():
            raise serializers.ValidationError("Email address must be valid")
        return email


class TeacherSerializerList(ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'email', 'address', 'phone', 'age']

    def validate_email(self, email):
        if '@' not in email:
            raise ValidationError("Email address must be valid")
        return email


class TeacherSerializer(ModelSerializer):
    content = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'name', 'email', 'address', 'phone', 'age', 'content']

    def validate_email(self, email):
        if '@' not in email.lower():
            raise serializers.ValidationError("Email address must be valid")
        return email


class StudentTeacherSerializer(ModelSerializer):
    tutor = TeacherSerializerList(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'address', 'phone', 'age', 'tutor', ]

    def validate_email(self, email):
        if '@' not in email.lower():
            raise serializers.ValidationError("Email address must be valid")
        return email


class StudentTeacherSerializerList(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'address', 'phone', 'age', 'tutor']

    def validate_email(self, email):
        if '@' not in email.lower():
            raise serializers.ValidationError("Email address must be valid")
        return email


class StudentTeacherSerializerList2(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'address', 'phone', 'age']

    def validate_email(self, email):
        if '@' not in email.lower():
            raise serializers.ValidationError("Email address must be valid")
        return email


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher', 'credits', 'exam_date']

    def validate_credits(self, credits):
        if credits < 0:
            raise serializers.ValidationError("Credits cannot be negative")
        return credits


# class CourseSerializerList(ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ['id', 'name', 'description', 'teacher', 'credits', 'exam_date']

class CourseStudentSerializer(ModelSerializer):
    class Meta:
        model = CourseStudent
        fields = ['course', 'student', 'enrollment_date', 'exam_date', 'grade']
        validators = [
            UniqueTogetherValidator(
                queryset=CourseStudent.objects.all(),
                fields=['course', 'student']
            )
        ]


class TutorsByAvgStudentAgeSerializer(ModelSerializer):
    # content = StudentSerializer(many=True, read_only=True)

    student_avg_age = serializers.SerializerMethodField()

    def get_student_avg_age(self, obj):
        avg_age = obj.content.aggregate(avg_age=Avg('age'))
        return avg_age['avg_age']

    class Meta:
        model = Teacher
        fields = ['id', 'name', 'email', 'address', 'phone', 'age', 'student_avg_age']


class CourseAttendeesSerializer(serializers.ModelSerializer):
    num_attendees = serializers.IntegerField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher', 'credits', 'exam_date',
                  'num_attendees']

    def get_num_attendees(self, obj):
        return obj.student_set.count()

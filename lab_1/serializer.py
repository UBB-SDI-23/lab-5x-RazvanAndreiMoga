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
    # teacher_id = IntegerField(write_only=True)
    # name = CharField(max_length=255)
    # description = CharField(max_length=255)
    # credits = IntegerField(write_only=True)
    # students = StudentSerializer(many=True, read_only=True)
    # teacher = TeacherSerializer(read_only=True)
    # exam_date = DateField(write_only=True)
    # #avg_age = serializers.FloatField(read_only=True)

    # def validate_teacher_id(self, value):
    #     filter = Teacher.objects.filter(id=value)
    #     if not filter.exists():
    #         raise ValidationError("Teacher does not exist")
    #     return value

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
    # course_id = IntegerField(write_only=True)
    # student_id = IntegerField(write_only=True)
    # enrollment_date = DateField(write_only=True)
    # grade = IntegerField(write_only=True)
    #
    # def validate_course_id(self, value):
    #     filter = Course.objects.filter(id=value)
    #     if not filter.exists():
    #         raise ValidationError("Course does not exist")
    #     return value
    #
    # def validate_student_id(self, value):
    #     filter = Student.objects.filter(id=value)
    #     if not filter.exists():
    #         raise ValidationError("Student does not exist")
    #     return value

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


# class CourseReportSerializer(serializers.ModelSerializer):
#     # student_count = serializers.SerializerMethodField()
#
#     nr_of_other_courses_attended_by_students = serializers.IntegerField()
#
#     class Meta:
#         model = Course
#         fields = ['id', 'name', 'description', 'teacher', 'credits', 'exam_date',
#                   'nr_of_other_courses_attended_by_students']
#
#     # def get_student_count(self, obj):
#     # student_ids = obj.students.all().values_list('id', flat=True)
#     # course_count = CourseStudent.objects.filter(student_id__in=student_ids).exclude(course_id=obj.id).values(
#     #     'course_id').annotate(count=Count('course_id')).count()
#     # return course_count
#     # return obj.coursestudent_set.count()


class CourseAttendeesSerializer(serializers.ModelSerializer):
    num_attendees = serializers.IntegerField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teacher', 'credits', 'exam_date',
                  'num_attendees']

    def get_num_attendees(self, obj):
        return obj.student_set.count()


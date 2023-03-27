from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, generics
from .models import *
from .serializer import *
from rest_framework import (viewsets, filters, )


# Create your views here.

# class StudentViewSet (ModelViewSet):
#     serializer_class = StudentSerializer
#     queryset = Student.objects.all()
#
# class TeacherViewSet(ModelViewSet):
#     serializer_class = TeacherSerializer
#     queryset = Teacher.objects.all()

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentTeacherSerializerList


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentTeacherSerializer


class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializerList


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class CourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()




class CourseStudentList(generics.ListCreateAPIView):
    serializer_class = CourseStudentSerializer
    queryset = CourseStudent.objects.all()


class CourseStudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseStudentSerializer
    queryset = CourseStudent.objects.all()


# class CouresList(generics.ListCreateAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializerList

# class StudentCourseEnrollment(generics.CreateAPIView):
#     serializer_class = CourseStudentSerializer
#
# class CourseStudentViewSet (ModelViewSet):
#     serializer_class = CourseStudentSerializer
#     queryset = CourseStudent.objects.all()
#
# class PassingStudentsCourse (generics.ListCreateAPIView):
#     serializer_class = CourseStudentSerializer
#     #queryset = Student.objects.filter(coursestudent__grade__gte=5)
#     queryset = CourseStudent.objects.filter(grade__gte=5)

class TeachersOlderThan(generics.ListAPIView):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.filter(age__gte=30)


class PassingStudentsCourse(generics.ListAPIView):
    serializer_class = CourseStudentSerializer
    queryset = CourseStudent.objects.filter(grade__gte=5)


class TutorsByAvgStudentAge(generics.ListAPIView):
    serializer_class = TutorsByAvgStudentAgeSerializer
    queryset = Teacher.objects.all().annotate(student_avg_age=Avg('content__age')).order_by('student_avg_age')
    # queryset = Teacher.objects.annotate(num_students=Count('course_teacher_content')).order_by('-num_students')


class CourseAttendees(generics.ListAPIView):


# queryset = Course.objects.all().order_by('-student_count')
# serializer_class = CourseStudentReportSerializer(queryset, many=True)

    queryset = Course.objects.annotate(num_attendees=models.Count('coursestudent__student')).order_by('-num_attendees')
    serializer_class = CourseAttendeesSerializer#(queryset, many=True)

class StudentAgeGreaterThan(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        age = int(self.kwargs['age'])
        queryset = Student.objects.filter(age__gt=age)
        return queryset

# queryset = Course.objects.annotate(student_count=models.Count('coursestudent')).order_by(
#     '-student_count')
# serializer_class = CourseReportSerializer
# #ordering = ('-num_attendees',)

# queryset = Course.objects.annotate(
#    nr_of_other_courses_attended_by_students=Count('coursestudent__student__courses', distinct=True) - 1).order_by('-nr_of_other_courses_attended_by_students')
# serializer_class = CourseReportSerializer
# ordering = ['-nr_of_other_courses_attended_by_students']

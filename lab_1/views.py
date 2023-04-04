from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, generics
from .models import *
from .serializer import *
from rest_framework import (viewsets, filters, status, )


# Create your views here.


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
    serializer_class = CourseAttendeesSerializer  # (queryset, many=True)


class StudentAgeGreaterThan(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        age = int(self.kwargs['age'])
        queryset = Student.objects.filter(age__gt=age)
        return queryset


class TeacherStudents(APIView):
    serializer_class = TeacherSerializer

    def post(self, request, *args, **kwargs):
        teacher_id = kwargs['teacher_id']
        student_ids = request.data.get('student_ids', [])
        teacher = Teacher.objects.get(pk=teacher_id)
        students = Student.objects.filter(pk__in=student_ids)

        for student in students:
            student.tutor = teacher
            student.save()

        serializer = self.serializer_class(teacher)
        return Response(serializer.data)

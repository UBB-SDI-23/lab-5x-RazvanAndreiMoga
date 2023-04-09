from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include
from rest_framework import routers


router = DefaultRouter()

urlpatterns = [


    path('teachers/<int:pk>/', TeacherDetail.as_view()),
    path('students/<int:pk>/', StudentDetail.as_view()),
    path('courses/<int:pk>/', CourseDetail.as_view()),
    path('course-student/<int:pk>/', CourseStudentDetail.as_view()),
    path('students/age-gt/<int:age>/', StudentAgeGreaterThan.as_view(), name='student-age-gt'),
    path('teachers/<int:teacher_id>/students/', TeacherStudents.as_view()),
    path('students/', StudentList.as_view()),
    path('teachers/', TeacherList.as_view()),
    path('courses/', CourseList.as_view()),
    path('course-student/', CourseStudentList.as_view()),
    # path('passing-students/', PassingStudentsCourse.as_view()),
    path('teachers-older-than/', TeachersOlderThan.as_view()),
    path('passing-students/', PassingStudentsCourse.as_view()),
    path('tutors-by-avg-student-age/', TutorsByAvgStudentAge.as_view(), name='tutors-by-avg-student-age'),
    # path('course-student-report/', CourseReport.as_view()),
    path('course-attendees/', CourseAttendees.as_view()),
    path('', include(router.urls)),

]

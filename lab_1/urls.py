from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include
from rest_framework import routers

router = DefaultRouter()
# router.register('student', StudentViewSet)
# router.register('teacher', TeacherViewSet)
# router.register('course', CourseViewSet)
# router.register('course-student', CourseStudentViewSet)
# router.register('passing-students', PassingStudentsCourse)

urlpatterns = [
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    path('student/<int:pk>/', StudentDetail.as_view()),
    path('course/<int:pk>/', CourseDetail.as_view()),
    path('course-student/<int:pk>/', CourseStudentDetail.as_view()),
    path('student/age-gt/<int:age>/', StudentAgeGreaterThan.as_view(), name='student-age-gt'),
    path('student/', StudentList.as_view()),
    path('teacher/', TeacherList.as_view()),
    path('course/', CourseList.as_view()),
    path('course-student/', CourseStudentList.as_view()),
    # path('passing-students/', PassingStudentsCourse.as_view()),
    path('teachers-older-than/', TeachersOlderThan.as_view()),
    path('passing-students/', PassingStudentsCourse.as_view()),
    path('tutors-by-avg-student-age/', TutorsByAvgStudentAge.as_view(), name='tutors-by-avg-student-age'),
    #path('course-student-report/', CourseReport.as_view()),
    path('course-attendees/', CourseAttendees.as_view()),
    path('', include(router.urls)),

]

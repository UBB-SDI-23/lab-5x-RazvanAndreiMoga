from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Teacher, Student
from .serializer import *
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Student


class TutorsByAvgStudentAgeTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.teacher1 = Teacher.objects.create(name='John Doe', email='john.doe@example.com', address='123 Main St', phone='555-1234', age=30)
        self.student1 = Student.objects.create(name='Alice Smith', email='alice.smith@example.com', address='456 Main St', phone='555-5678', age=20, tutor=self.teacher1)
        self.student2 = Student.objects.create(name='Bob Johnson', email='bob.johnson@example.com', address='789 Main St', phone='555-9012', age=25, tutor=self.teacher1)

        self.teacher2 = Teacher.objects.create(name='Jane Smith', email='jane.smith@example.com', address='246 Main St', phone='555-4321', age=35)
        self.student3 = Student.objects.create(name='Charlie Brown', email='charlie.brown@example.com', address='135 Main St', phone='555-8765', age=22, tutor=self.teacher2)
        self.student4 = Student.objects.create(name='David Lee', email='david.lee@example.com', address='468 Main St', phone='555-1098', age=24, tutor=self.teacher2)

    def test_get_tutors_by_avg_student_age(self):
        url = reverse('tutors-by-avg-student-age')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        self.assertEqual(response.data[0]['id'], self.teacher1.id)
        self.assertEqual(response.data[0]['name'], self.teacher1.name)
        self.assertEqual(response.data[0]['email'], self.teacher1.email)
        self.assertEqual(response.data[0]['address'], self.teacher1.address)
        self.assertEqual(response.data[0]['phone'], self.teacher1.phone)
        self.assertEqual(response.data[0]['age'], self.teacher1.age)
        self.assertEqual(response.data[0]['student_avg_age'], 22.5)

        self.assertEqual(response.data[1]['id'], self.teacher2.id)
        self.assertEqual(response.data[1]['name'], self.teacher2.name)
        self.assertEqual(response.data[1]['email'], self.teacher2.email)
        self.assertEqual(response.data[1]['address'], self.teacher2.address)
        self.assertEqual(response.data[1]['phone'], self.teacher2.phone)
        self.assertEqual(response.data[1]['age'], self.teacher2.age)
        self.assertEqual(response.data[1]['student_avg_age'], 23)

    def test_tutors_by_avg_student_age_serializer(self):
        teacher_serializer_data = TutorsByAvgStudentAgeSerializer(instance=self.teacher1).data
        self.assertEqual(teacher_serializer_data['student_avg_age'], 22.5)


class StudentAgeGreaterThanTest(APITestCase):
    def setUp(self):
        self.student1 = Student.objects.create(
            name='John Doe', email='john@example.com', address='123 Main St', phone='555-1234', age=25
        )
        self.student2 = Student.objects.create(
            name='Jane Smith', email='jane@example.com', address='456 Oak St', phone='555-5678', age=30
        )
        self.student3 = Student.objects.create(
            name='Bob Johnson', email='bob@example.com', address='789 Elm St', phone='555-9012', age=20
        )

    def test_student_age_greater_than(self):
        url = reverse('student-age-gt', kwargs={'age': 25})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Jane Smith')

    def test_student_age_greater_than_no_results(self):
        url = reverse('student-age-gt', kwargs={'age': 35})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)


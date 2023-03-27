from django.db import models


# Create your models here.

class Teacher(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    age = models.IntegerField()

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    age = models.IntegerField()
    tutor = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True, related_name='content')
    courses = models.ManyToManyField('Course', through='CourseStudent')


    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True, related_name='course_teacher_content')
    credits = models.IntegerField()
    exam_date = models.DateField()

    def __str__(self):
        return self.name


class CourseStudent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    exam_date = models.DateField()
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.course.name} - {self.student.name}"

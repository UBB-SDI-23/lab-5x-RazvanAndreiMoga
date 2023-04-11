import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoProject1.settings')
django.setup()
from lab_1.models import *

if __name__ == '__main__':
    from faker import Faker

    fake = Faker()
    n = 1000000
    print("Creating data")
    for _ in range(n):
        Teacher.objects.create(name=fake.name(), email=fake.email(), address=fake.address(), phone=fake.phone_number(),
                               age=fake.random_int(min=18, max=100))
        Student.objects.create(name=fake.name(), email=fake.email(), address=fake.address(), phone=fake.phone_number(),
                               age=fake.random_int(min=18, max=100),
                               tutor=Teacher.objects.last())
        Course.objects.create(name=fake.name(), description=fake.text(),
                              teacher=Teacher.objects.last(),
                              credits=fake.random_int(min=1, max=10), exam_date=fake.date())
    n = 10000000
    for _ in range(n):
        CourseStudent.objects.create(course=Course.objects.last(),
                                     student=Student.objects.last(),
                                     exam_date=fake.date(), grade=fake.random_int(min=1, max=10))
    print("Done")

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoProject1.settings')
django.setup()
from lab_1.models import *

if __name__ == '__main__':
    from faker import Faker

    fake = Faker()
    n = 10000
    for _ in range(n):
        Teacher.objects.create(name=fake.name(), email=fake.email(), address=fake.address(), phone=fake.phone_number(),
                               age=fake.random_int(min=18, max=100))
        Student.objects.create(name=fake.name(), email=fake.email(), address=fake.address(), phone=fake.phone_number(),
                               age=fake.random_int(min=18, max=100),
                               tutor=Teacher.objects.get(id=fake.random_int(min=1, max=n)))
        Course.objects.create(name=fake.name(), description=fake.text(),
                              teacher=Teacher.objects.get(id=fake.random_int(min=1, max=n)),
                              credits=fake.random_int(min=1, max=10), exam_date=fake.date())
        CourseStudent.objects.create(course=Course.objects.get(id=fake.random_int(min=1, max=n)),
                                     student=Student.objects.get(id=fake.random_int(min=1, max=n)),
                                     exam_date=fake.date(), grade=fake.random_int(min=1, max=10))

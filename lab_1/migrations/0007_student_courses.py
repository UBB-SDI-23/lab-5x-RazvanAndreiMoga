# Generated by Django 4.1.7 on 2023-03-21 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lab_1', '0006_alter_course_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='courses',
            field=models.ManyToManyField(through='lab_1.CourseStudent', to='lab_1.course'),
        ),
    ]
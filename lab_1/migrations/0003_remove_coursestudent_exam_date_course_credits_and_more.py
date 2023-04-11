# Generated by Django 4.1.7 on 2023-03-14 15:08

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lab_1', '0002_course_coursestudent_student_teacher_delete_address_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursestudent',
            name='exam_date',
        ),
        migrations.AddField(
            model_name='course',
            name='credits',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='exam_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='phone',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='tutor',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, to='lab_1.teacher'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teacher',
            name='age',
            field=models.IntegerField(default=-1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teacher',
            name='phone',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
    ]
import { Course } from "./Course";
import { Student } from "./Student";

export interface CourseStudent{
    course: Course;
    student: Student;
    enrolment_date: Date;
    exam_date: Date;
    grade: number;
}
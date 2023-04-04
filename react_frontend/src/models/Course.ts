import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Course{
    id: number;
    name: string;
    description: string;
    teacher: Teacher;
    credits: number;
    exam_date: Date;
    // students: Student[];
}
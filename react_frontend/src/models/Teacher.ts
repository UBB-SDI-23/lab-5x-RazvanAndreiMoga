import { Student } from "./Student";

export interface Teacher{
    id: number;
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
    content: Student[];
    student_avg_age?: number;
}
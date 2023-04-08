import { Course } from "./Course";
import { Teacher } from "./Teacher";

export interface Student{
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    age: number;
    tutor: Teacher;
    // courses: Course[];
}
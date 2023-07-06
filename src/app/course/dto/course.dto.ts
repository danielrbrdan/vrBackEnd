import { IsNotEmpty } from "class-validator";
import { Student } from "src/app/student/student.entity";
import { Course } from "../course.entity";
import { Transform } from 'class-transformer';


export class CourseDto {
    public readonly id: number;
    
    @IsNotEmpty()
    public readonly description: string;

    @IsNotEmpty()
    public readonly subject: string;

    public readonly students: Student[];

}
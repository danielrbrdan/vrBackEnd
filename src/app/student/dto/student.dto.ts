import { IsNotEmpty } from 'class-validator';
import { Course } from 'src/app/course/course.entity';

export class StudentDto {
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  public readonly courses: Course[];
}

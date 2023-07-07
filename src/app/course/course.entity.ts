import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';
import { Transform } from 'class-transformer';
import { CourseDto } from './dto/course.dto';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'text' })
  subject: string;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];

  @Transform(() => CourseDto)
  toDTO(): CourseDto {
    return {
      id: this.id,
      description: this.description,
      subject: this.subject,
      students: this.students,
    };
  }
}

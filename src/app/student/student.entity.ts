import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Transform } from 'class-transformer';
import { StudentDto } from './dto/student.dto';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: 'course_student',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  courses: Course[];

  @Transform(() => StudentDto)
  toDTO(): StudentDto {
    return {
      id: this.id,
      name: this.name,
      courses: this.courses,
    };
  }
}

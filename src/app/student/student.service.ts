import { HttpException, Inject, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';
import { CourseService } from '../course/course.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @Inject(CourseService)
    private readonly courseService: CourseService,
  ) {}

  async addCourse(studentId: number, courseId: number) {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    const course = await this.courseService.findOneById(courseId);

    if (!student || !course) {
      throw new Error('Entidade não encontrada');
    }

    student.courses = !!student.courses
      ? student.courses.concat(course)
      : [course];

    return await this.studentRepository.save(student);
  }

  async removeCourse(studentId: number, courseId: number) {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    const course = await this.courseService.findOneById(courseId);

    if (!student || !course) {
      throw new HttpException('Entidade não encontrada', HttpStatus.NOT_FOUND);
    }

    student.courses = student.courses.filter((course) => {
      return course.id != courseId;
    });

    return await this.studentRepository.save(student);
  }

  async deleteById(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: { courses: true },
    });

    if (!student) {
      throw new HttpException('Estudante não encontrado', HttpStatus.NOT_FOUND);
    }

    if (!!student?.courses?.length) {
      throw new HttpException(
        'Não é possivel deletar um estudante matriculado em algum curso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.studentRepository.delete({ id: student.id });
  }

  async create(studentDto: StudentDto) {
    const student = plainToClass(Student, studentDto);

    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find({
      relations: {
        courses: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }
}

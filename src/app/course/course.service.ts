import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({
            relations: {
                students: true
            }
        });

    }

    async deleteById(id: number) {
        const course = await this.courseRepository.findOne({
            where: {id: id},
            relations: {students: true}
        });

        if (!course) {
            throw new HttpException(
                "Curso não encontrado", 
                HttpStatus.NOT_FOUND
            );
        }

        if (!!course?.students?.length) {
            throw new HttpException(
                "Não é possivel deletar um curso com alunos cadastrados.", 
                HttpStatus.FORBIDDEN
            );
        }

        return await this.courseRepository.delete({id: course.id});
    }

    async create(courseDto: CourseDto) {
        const course = new Course();
        course.id = courseDto.id;
        course.description = courseDto.description;
        course.subject = courseDto.subject;
    
        return await this.courseRepository.save(course);
	}

    async findOneById(courseId: number) {
        return await this.courseRepository.findOne({
            where: {id: Number(courseId)},
            relations: {students: true}
        });
    };

}

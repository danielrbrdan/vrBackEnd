import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) {}

    @Get()
    async findAll() {
        const courses = await this.courseService.findAll();
        return courses.map(course => course.toDTO())
    }

    @Post()
    async save(@Body() courseDto: CourseDto) {
        return (await this.courseService.create(courseDto)).toDTO();
    }

    @Delete(':id')
    deleteById(@Param('id') id: number) {
        return this.courseService.deleteById(id);
    }

}

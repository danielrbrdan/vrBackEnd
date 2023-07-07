import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { CourseDto } from '../course/dto/course.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll() {
    const students = await this.studentService.findAll();
    return students.map((students) => students.toDTO());
  }

  @Post()
  async save(@Body() studentDto: StudentDto) {
    return (await this.studentService.create(studentDto)).toDTO();
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.studentService.deleteById(id);
  }

  @Put('/:studentId/courses/:courseId')
  async addCourse(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number,
  ) {
    return (await this.studentService.addCourse(studentId, courseId)).toDTO();
  }

  @Delete('/:studentId/courses/:courseId')
  async removeCourse(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number,
  ) {
    return (
      await this.studentService.removeCourse(studentId, courseId)
    ).toDTO();
  }
}

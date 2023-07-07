import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { CourseService } from '../course/course.service';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), CourseModule],
  providers: [TypeOrmModule, StudentService],
  controllers: [StudentController],
})
export class StudentModule {}

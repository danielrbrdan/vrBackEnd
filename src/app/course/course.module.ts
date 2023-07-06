import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [TypeOrmModule, CourseService],
  controllers: [CourseController],
  exports: [CourseService]
})
export class CourseModule {}

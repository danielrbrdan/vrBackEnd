import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './app/course/course.module';
import { StudentModule } from './app/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CourseService } from './app/course/course.service';
import { StudentService } from './app/student/student.service';
import { Course } from './app/course/course.entity';
import { Student } from './app/student/student.entity';

@Module({
  imports: [
    CourseModule,
    StudentModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    TypeOrmModule.forFeature([Course]),
    TypeOrmModule.forFeature([Student]),
  ],
  controllers: [AppController],
  providers: [AppService, CourseService, StudentService],
})
export class AppModule {}

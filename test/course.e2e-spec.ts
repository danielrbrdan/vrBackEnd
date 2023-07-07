import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CourseDto } from '../src/app/course/dto/course.dto';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let createdCourseId: number;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all courses', () => {
    return request(app.getHttpServer())
      .get('/courses')
      .expect(200)
      .expect((response: request.Response) => {
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((course: CourseDto) => {
          expect(course.id).toBeDefined();
          expect(course.description).toBeDefined();
          expect(course.subject).toBeDefined();
        });
      });
  });

  it('should return 404 deleting a non-existing course', () => {
    return request(app.getHttpServer()).delete('/courses/0').expect(404);
  });

  it('should return 400 creating a course with no subject', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send({
        description: 'foo',
      })
      .expect(400);
  });

  it('should return 201 creating a new course', () => {
    const courseDto: CourseDto = {
      description: 'Foo Course',
      subject: 'Foo Subject',
      students: [],
      id: null,
    };

    return request(app.getHttpServer())
      .post('/courses')
      .send(courseDto)
      .expect(201)
      .expect((response) => {
        createdCourseId = response.body.id;
        expect(response.body.id).toBeDefined();
        expect(response.body.description).toBe(courseDto.description);
        expect(response.body.subject).toBe(courseDto.subject);
        expect(response.body.students).toEqual(courseDto.students);
      });
  });

  it(`should return 200 deleting a course `, () => {
    return request(app.getHttpServer())
      .delete(`/courses/${createdCourseId}`)
      .expect(200);
  });
});

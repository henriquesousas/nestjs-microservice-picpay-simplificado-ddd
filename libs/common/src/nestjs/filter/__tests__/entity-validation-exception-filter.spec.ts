import request from 'supertest';
import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityValidationExceptionFilter } from '../entity-validation-exception.filter';
import { EntityValidationException } from '../../../core/exception/entity-validation.exception';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new EntityValidationException([
      'another error',
      { field1: ['error1', 'error2'] },
      { field2: ['error3'] },
    ]);
  }
}

describe('EntityValidationExceptionFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityValidationExceptionFilter());
    await app.init();
  });

  it.only('should catch a EntityValidationException', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(422)
      .expect({ messages: ['another error', 'error1', 'error2', 'error3'] });
  });
});

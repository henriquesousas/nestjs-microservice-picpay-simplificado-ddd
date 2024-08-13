import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NotFoundExceptionFilter } from '../not-found-exception.filter';
import { CustomerNotFoundException } from '../../../../../../src/core/customer/domain/exception/customer-not-found.exception';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new CustomerNotFoundException();
  }
}

describe('NotFoundExceptionFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundExceptionFilter());
    await app.init();
  });

  it('should catch a NotFoundException', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(404)
      .expect({ message: 'Cliente não localizado' });
  });
});

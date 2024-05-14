import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/AppModule';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: 'any_user',
        secondName: 'any_user',
        email: 'email@mail.com',
        document: '67092415055',
        amount: 0,
        password: '123456',
        documentType: 'Cpf',
      })
      .expect(201);
  });
});

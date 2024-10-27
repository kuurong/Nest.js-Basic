import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    console.log(process.env.NODE_ENV); // npm run test:e2e - 결과: test
    // jest 는 실행될때 process.env.NODE_ENV의 값을 test 로 항상 값을 보냄
    return request(app.getHttpServer()).get('/').expect(404);
  });
});

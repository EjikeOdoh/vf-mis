import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

describe('StatsController', () => {
  let app: INestApplication;
  const statsService = {
    getOverview: jest.fn(),
    getReach: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [{ provide: StatsService, useValue: statsService }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('accepts year in the query string for /stats/reach', async () => {
    statsService.getReach.mockResolvedValue({ ok: true });

    await request(app.getHttpServer())
      .get('/stats/reach?year=2022')
      .expect(200);

    expect(statsService.getReach).toHaveBeenCalledWith(2022);
  });

  it('accepts year as a path param for /stats/reach/:year', async () => {
    statsService.getReach.mockResolvedValue({ ok: true });

    await request(app.getHttpServer())
      .get('/stats/reach/2022')
      .expect(200);

    expect(statsService.getReach).toHaveBeenCalledWith(2022);
  });
});

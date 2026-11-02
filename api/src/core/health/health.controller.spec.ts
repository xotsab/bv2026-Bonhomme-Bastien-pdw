import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('GET /health/live renvoie { status: "ok" }', () => {
    expect(controller.live()).toEqual({ status: 'ok' });
  });
});

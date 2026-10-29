import { Controller, Get } from '@nestjs/common';

import { SkipApiTransform } from '../../common/api/decorator/skip-api-transform.decorator.js';
import { HealthService } from './health.service.js';

@SkipApiTransform()
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  live(): { status: string } {
    return this.healthService.live();
  }
}

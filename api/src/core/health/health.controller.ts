import { Controller, Get } from '@nestjs/common';

import { SkipApiTransform } from '../../common/api/index.js';

@SkipApiTransform()
@Controller('health')
export class HealthController {
  @Get('live')
  live() {
    return { status: 'ok' };
  }
}

import { Controller, Get } from '@nestjs/common';

import { SkipApiTransform } from '../../common/api/index.js';
import { Public } from '../auth/decorator/public.decorator.js';

@SkipApiTransform()
@Public()
@Controller('health')
export class HealthController {
  @Get('live')
  live() {
    return { status: 'ok' };
  }
}

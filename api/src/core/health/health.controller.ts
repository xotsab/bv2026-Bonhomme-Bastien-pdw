import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';
import { SkipApiTransform } from '../../common/api/decorator/skip-api-transform.decorator.js';
@SkipApiTransform()
@Controller('health')
export class HealthController {
    constructor( private readonly healthService: HealthService) {
    }
    @Get('live')
    getstatus(): string {
        return this.healthService.getstatus();
    }
}

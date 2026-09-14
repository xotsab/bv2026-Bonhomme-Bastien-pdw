import { Module } from '@nestjs/common';

import { AppConfigModule } from '../common/config/app-config.module.js';
import { HealthModule } from '../core/health/health.module.js';

@Module({})
export class AppModule {
  static register() {
    return {
      module: AppModule,
      imports: [
        AppConfigModule.register(),
        HealthModule,
      ],
    };
  }
}

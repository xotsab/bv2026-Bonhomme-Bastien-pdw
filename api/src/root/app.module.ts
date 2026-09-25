import { Module } from '@nestjs/common';

import { AppConfigModule } from '../common/config/app-config.module.js';
import { HealthModule } from '../core/health/health.module.js';
import { LoggingModule } from '../common/logging/logging.module.js';
import { ApiInterceptor } from '../common/api/interceptor/api.interceptor.js';
import { HttpExceptionFilter } from '../common/api/filter/http-exception.filter.js';

@Module({})
export class AppModule {
  static register() {
    return {
      module: AppModule,
      imports: [
        AppConfigModule.register(),
        LoggingModule,
        HealthModule,
      ],
      providers: [
      ApiInterceptor,HttpExceptionFilter,
 ],
    };
  }
}

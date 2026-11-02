import { DynamicModule, Module } from '@nestjs/common';

import { HttpExceptionFilter } from '../common/api/filter/http-exception.filter.js';
import { ApiInterceptor } from '../common/api/interceptor/api.interceptor.js';
import { AppConfigModule } from '../common/config/app-config.module.js';
import { DatabaseModule } from '../common/database/database.module.js';
import { ApplicationLifecycleLogger } from '../common/logging/application-lifecycle.logger.js';
import { LoggingModule } from '../common/logging/logging.module.js';
import { HealthModule } from '../core/health/health.module.js';
import { AccountModule } from '../core/account/account.module.js';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        AppConfigModule.register(),
        LoggingModule,
        DatabaseModule,
        HealthModule,
        AccountModule,
      ],
      providers: [
        ApiInterceptor,
        HttpExceptionFilter,
        ApplicationLifecycleLogger,
      ],
    };
  }
}

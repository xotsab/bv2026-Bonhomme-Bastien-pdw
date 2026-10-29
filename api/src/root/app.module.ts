import { DynamicModule, Module } from '@nestjs/common';

import { HttpExceptionFilter } from '../common/api/filter/http-exception.filter.js';
import { ApiInterceptor } from '../common/api/interceptor/api.interceptor.js';
import { AppConfigModule } from '../common/config/app-config.module.js';
import { ApplicationLifecycleLogger } from '../common/logging/application-lifecycle.logger.js';
import { LoggingModule } from '../common/logging/logging.module.js';
import { HealthModule } from '../core/health/health.module.js';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [AppConfigModule.register(), LoggingModule, HealthModule],
      providers: [
        // Déclarés ici, activés globalement par configureApplication (thème 5)
        ApiInterceptor,
        HttpExceptionFilter,
        // Thème 3 : journalise application.stopped à l'arrêt
        ApplicationLifecycleLogger,
      ],
    };
  }
}

import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';

import { ValidationException } from '../../common/api/data/exception/validation-exception.js';
import { HttpExceptionFilter } from '../../common/api/filter/http-exception.filter.js';
import { ApiInterceptor } from '../../common/api/interceptor/api.interceptor.js';
import { setupSwagger } from '../../common/api/swagger/setup-swagger.js';
import { EnvService } from '../../common/config/env.service.js';

export const configureApplication = (app: INestApplication): void => {
  const envService = app.get(EnvService);

  app.setGlobalPrefix(envService.appBaseUrl, {
    exclude: [
      { path: 'health/live', method: RequestMethod.GET },
      { path: 'health/ready', method: RequestMethod.GET },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors) =>
        ValidationException.fromClassValidatorErrors(
          errors,
          envService.httpPayloadErrorStatusCode,
        ),
    }),
  );

  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalInterceptors(app.get(ApiInterceptor));

  setupSwagger(app);
};

import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module.js';
import { EnvService } from './common/config/env.service.js';
import { AppLogger } from './common/logging/app-logger.service.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { ApiInterceptor } from './common/api/interceptor/api.interceptor.js';
import { ValidationException } from './common/api/data/exception/validation-exception.js';
import { ValidationPipe,ValidationError } from '@nestjs/common';
import { HttpExceptionFilter } from './common/api/filter/http-exception.filter.js';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
 AppModule.register(),
 {
 bufferLogs: true,
 },
 );
 app.useLogger( app.get(Logger));
 app.enableShutdownHooks();
 const envService = app.get(EnvService);
 app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]):ValidationException =>
      ValidationException.fromClassValidatorErrors(
        errors,
        envService.httpPayloadErrorStatusCode,
      ),
      }),
 );
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalInterceptors(app.get(ApiInterceptor));


 await app.listen(envService.appPort);
 const appLogger = await app.resolve(AppLogger);
 appLogger.setContext('Bootstrap');
 appLogger.application({
 event: 'application.started',
 port: envService.appPort,
 })
}
await bootstrap();

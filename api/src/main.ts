import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module.js';
import { EnvService } from './common/config/env.service.js';
import { AppLogger } from './common/logging/app-logger.service.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';


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
 await app.listen(envService.appPort);
 const appLogger = await app.resolve(AppLogger);
 appLogger.setContext('Bootstrap');
 appLogger.application({
 event: 'application.started',
 port: envService.appPort,
 })
}
await bootstrap();

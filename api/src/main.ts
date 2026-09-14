import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module.js';
import { EnvService } from './common/config/env.service.js';

/*export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());

  const envService = app.get(EnvService);

  await app.listen(envService.appPort);
}
await bootstrap();

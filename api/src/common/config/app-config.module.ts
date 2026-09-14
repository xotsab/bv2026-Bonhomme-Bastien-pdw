import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service.js';
import { validateEnvironment } from './environment/environment.validation.js';

@Global()
@Module({})

export class AppConfigModule {
 static register(): DynamicModule {
 return {
 module: AppConfigModule,
 global: true,
 imports: [
 ConfigModule.forRoot({
 isGlobal: true,
 validate: validateEnvironment,
 }),
 ],
 providers: [EnvService],
 exports: [EnvService],
 };
}
}

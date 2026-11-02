import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvService } from '../config/index.js';

import { createNestTypeOrmOptions } from './typeorm/typeorm-options.factory.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      useFactory: createNestTypeOrmOptions,
    }),
  ],
})
export class DatabaseModule {}

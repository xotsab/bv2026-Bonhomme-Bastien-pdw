import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountService } from './account.service.js';
import { AccountEntity } from './data/entity/account.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

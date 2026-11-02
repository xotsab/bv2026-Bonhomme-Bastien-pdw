import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthIdentifierEntity } from './data/entity/auth-identifier.entity.js';
import { AuthRefreshTokenEntity } from './data/entity/auth-refresh-token.entity.js';
import { AuthSessionEntity } from './data/entity/auth-session.entity.js';
import { PasswordCredentialEntity } from './data/entity/password-credential.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthIdentifierEntity,
      PasswordCredentialEntity,
      AuthSessionEntity,
      AuthRefreshTokenEntity,
    ]),
  ],
})
export class AuthModule {}

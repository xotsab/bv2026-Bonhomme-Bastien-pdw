import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthIdentifierEntity } from './data/entity/auth-identifier.entity.js';
import { AuthRefreshTokenEntity } from './data/entity/auth-refresh-token.entity.js';
import { AuthSessionEntity } from './data/entity/auth-session.entity.js';
import { PasswordCredentialEntity } from './data/entity/password-credential.entity.js';
import { TokenCryptoService } from './service/token-crypto.service.js';
import { CsrfService } from './service/csrf.service.js';
import { AuthCookieService } from './service/auth-cookie.service.js';
import { PasswordPolicyService } from './service/password-policy.service.js';
import { PasswordHasherService } from './service/password-hasher.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthIdentifierEntity,
      PasswordCredentialEntity,
      AuthSessionEntity,
      AuthRefreshTokenEntity,
    ]),
  ],
  providers: [
    PasswordHasherService,
    PasswordPolicyService,
    AuthCookieService,
    CsrfService,
    TokenCryptoService]
})
export class AuthModule {}

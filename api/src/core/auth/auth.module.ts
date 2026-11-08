import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '../account/index.js';

import { AuthController } from './controller/auth.controller.js';
import { AuthService } from './service/auth.service.js';
import { AuthIdentifierService } from './service/auth-identifier.service.js';
import { PasswordCredentialService } from './service/password-credential.service.js';
import { AuthIdentifierEntity } from './data/entity/auth-identifier.entity.js';
import { PasswordCredentialEntity } from './data/entity/password-credential.entity.js';
import { PasswordHasherService } from './service/password-hasher.service.js';
import { PasswordPolicyService } from './service/password-policy.service.js';
import { AuthSessionEntity } from './data/entity/auth-session.entity.js';
import { AuthRefreshTokenEntity } from './data/entity/auth-refresh-token.entity.js';
import { AuthCookieService } from './service/auth-cookie.service.js';
import { AuthSessionService } from './service/auth-session.service.js';
import { CsrfService } from './service/csrf.service.js';
import { RefreshTokenService } from './service/refresh-token.service.js';
import { TokenCryptoService } from './service/token-crypto.service.js';
import { AccessAuthGuard } from './guard/access-auth.guard.js';
import { OriginGuard } from './guard/origin.guard.js';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forFeature([
      AuthIdentifierEntity,
      PasswordCredentialEntity,
      AuthSessionEntity,
      AuthRefreshTokenEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthIdentifierService,
    PasswordCredentialService,
    PasswordHasherService,
    PasswordPolicyService,
    AuthCookieService,
    AuthSessionService,
    CsrfService,
    RefreshTokenService,
    TokenCryptoService,
    { provide: APP_GUARD, useClass: OriginGuard },
    { provide: APP_GUARD, useClass: AccessAuthGuard },
  ],
})
export class AuthModule {}

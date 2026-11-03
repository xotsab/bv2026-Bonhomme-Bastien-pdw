import { Injectable } from '@nestjs/common';
import type { CookieOptions } from 'express';
import type { Response } from 'express';
import { EnvService } from '../../../common/config/index.js';

export type AuthCookieNames = {
  access: string;
  refresh: string;
  csrf: string;
};
@Injectable()
export class AuthCookieService {
  readonly names: AuthCookieNames;

  constructor(private readonly envService: EnvService) {
    this.names = this.envService.isProduction
      ? {
          access: '__Host-hoos-access',
          refresh: '__Host-hoos-refresh',
          csrf: '__Host-hoos-csrf',
        }
      : { access: 'hoos-access', refresh: 'hoos-refresh', csrf: 'hoos-csrf' };
  }

  setAccessCookie(response: Response, token: string): void {
    response.cookie(this.names.access, token, {
      ...this.baseOptions(true),
      maxAge: this.envService.accessTokenTtlSeconds * 1000,
    });
  }

  private baseOptions(httpOnly: boolean): CookieOptions {
    return {
      httpOnly,
      secure: this.envService.isProduction,
      sameSite: 'strict',
      path: '/',
    };
  }
}

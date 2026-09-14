import { describe, expect, it } from 'vitest';
import { validateEnvironment } from '../environment/environment.validation.js';

const validEnvironment = {
  NODE_ENV: 'DEV',
  APP_NAME: 'my-app',
  APP_PORT: '3000',
  APP_CORS_ORIGIN: 'http://localhost:3000',
  LOG_LEVEL: 'info',
  DB_SYNC: 'false',

  AUTH_PASSWORD_MIN_LENGTH: '15',
  AUTH_REFRESH_TOKEN_TTL_SECONDS: '3600',
  AUTH_SESSION_ABSOLUTE_TTL_SECONDS: '7200',

};

describe('validateEnvironment', () => {
  it('accepte un environnement valide', () => {
    const result = validateEnvironment(validEnvironment);

    expect(result).toBeDefined();
  });

  it('convertit APP_PORT en nombre', () => {
    const result = validateEnvironment(validEnvironment);

    expect(result.APP_PORT).toBe(3000);
    expect(typeof result.APP_PORT).toBe('number');
  });

  it('convertit DB_SYNC en booléen', () => {
    const result = validateEnvironment(validEnvironment);

    expect(result.DB_SYNC).toBe(false);
    expect(typeof result.DB_SYNC).toBe('boolean');
  });

  it('convertit APP_CORS_ORIGIN en tableau', () => {
    const result = validateEnvironment(validEnvironment);

    expect(result.APP_CORS_ORIGIN).toEqual([
      'http://localhost:3000',

    ]);
  });

  it('rejette DB_SYNC=true en production', () => {
    const environment = {
      ...validEnvironment,
      NODE_ENV: 'PROD',
      DB_SYNC: 'true',
    };

    expect(() => validateEnvironment(environment)).toThrow(
      'DB_SYNC=true is not allowed in production',
    );
  });

  it('rejette un refresh token TTL supérieur au TTL absolu de session', () => {
    const environment = {
      ...validEnvironment,
      AUTH_REFRESH_TOKEN_TTL_SECONDS: '7200',
      AUTH_SESSION_ABSOLUTE_TTL_SECONDS: '3600',
    };

    expect(() => validateEnvironment(environment)).toThrow(
      'Refresh token TTL cannot exceed absolute session TTL',
    );
  });
});

import { describe, expect, it } from 'vitest';

import { validateEnvironment } from './environment.validation.js';

const validEnvironment: Record<string, string> = {
  NODE_ENV: 'DEV',
  APP_NAME: 'api',
  APP_PORT: '3000',
  APP_BASE_URL: 'api',
  APP_CORS_ORIGIN: 'http://localhost:4200',
  APP_TRUST_PROXY: 'false',
  APP_HTTP_PAYLOAD_ERROR_CODE: '422',
  LOG_LEVEL: 'debug',
  SWAGGER_ENABLED: 'true',
  SWAGGER_TITLE: 'API',
  SWAGGER_DESCRIPTION: 'HTTP API',
  SWAGGER_VERSION: '0.1.0',
  SWAGGER_PATH: 'docs',
  DB_TYPE: 'postgres',
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USER: 'postgres',
  DB_PASSWORD: 'postgres',
  DB_DATABASE: 'api',
  DB_SYNC: 'false',
  DB_MIGRATION: 'true',
  DB_LOG: 'false',
};

describe('validateEnvironment', () => {
  it('accepte et normalise un environnement valide (coercition)', () => {
    expect(validateEnvironment(validEnvironment)).toMatchObject({
      NODE_ENV: 'DEV',
      APP_PORT: 3000,
      APP_CORS_ORIGIN: ['http://localhost:4200'],
      APP_TRUST_PROXY: false,
      DB_PORT: 5432,
      DB_SYNC: false,
      DB_SCHEMA: 'public',
    });
  });

  it('rejette DB_SYNC=true en production', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        NODE_ENV: 'PROD',
        DB_SYNC: 'true',
      }),
    ).toThrow('DB_SYNC=true is not allowed in production');
  });

  it('rejette un refresh token TTL supérieur au TTL absolu de session', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        AUTH_REFRESH_TOKEN_TTL_SECONDS: '7200',
        AUTH_SESSION_ABSOLUTE_TTL_SECONDS: '3600',
      }),
    ).toThrow('Refresh token TTL cannot exceed absolute session TTL');
  });

  it('rejette une origine CORS joker (*)', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        APP_CORS_ORIGIN: '*',
      }),
    ).toThrow('explicit allowlist');
  });

  it('rejette une variable obligatoire absente', () => {
    const environment = { ...validEnvironment };
    delete environment.DB_PASSWORD;

    expect(() => validateEnvironment(environment)).toThrow('DB_PASSWORD');
  });

  it('rejette un nom de schéma de base dangereux', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        DB_SCHEMA: 'public; DROP SCHEMA public',
      }),
    ).toThrow('DB_SCHEMA');
  });

  it("rejette un point d'injection de panne inconnu", () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        AUTH_TEST_REFRESH_FAILURE_POINT: 'unknown-point',
      }),
    ).toThrow('AUTH_TEST_REFRESH_FAILURE_POINT');
  });
});

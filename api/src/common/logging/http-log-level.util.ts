import { HttpLogLevel } from './data/enum/http-log-level.type.js';

const HEALTH_CHECK_LOG_PATHS = new Set([
  '/health/live',
  '/health/ready',
]);

export const resolveHttpLogLevel = (
  path: string | undefined,
  statusCode: number,
  hasError: boolean,
): HttpLogLevel => {
  const normalizedPath = path?.split('?')[0];

  if (
    !hasError &&
    statusCode < 400 &&
    normalizedPath !== undefined &&
    HEALTH_CHECK_LOG_PATHS.has(normalizedPath)
  ) {
    return 'silent';
  }

  if (hasError || statusCode >= 500) {
    return 'error';
  }

  if (statusCode >= 400) {
    return 'warn';
  }

  return 'info';
};

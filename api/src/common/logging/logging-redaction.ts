const SENSITIVE_HEADER_NAMES = ['authorization', 'cookie', 'set-cookie'];
const SENSITIVE_FIELD_NAMES = [
 'password', 'passwordHash', 'pin', 'pinHash', 'otp', 'otpSecret',
 'accessToken', 'refreshToken', 'refreshTokenHash', 'sessionHash',
 'token', 'secret', 'apiKey', 'clientSecret', 'databasePassword',
];

const headerPath = (section: 'req' | 'res',header: string): string =>
  header.includes('-')
    ? `${section}.headers["${header}"]`
    : `${section}.headers.${header}`;

const sensitiveDataPaths = (root: string): string[] =>
 SENSITIVE_FIELD_NAMES.flatMap((field) => [
 `${root}.${field}`,
 `${root}.*.${field}`,
 ]);
export const LOG_REDACTION_PATHS = [
 ...SENSITIVE_HEADER_NAMES.map((h) => headerPath('req', h)),
 ...SENSITIVE_HEADER_NAMES.map((h) => headerPath('res', h)),
 ...sensitiveDataPaths('req.body'),
 ...sensitiveDataPaths('req.query'),
];

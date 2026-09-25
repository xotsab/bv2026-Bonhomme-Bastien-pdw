import { Global, Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { EnvService } from '../config/env.service.js';
import { AppLogger } from './app-logger.service.js';
import { LOG_REDACTION_PATHS } from './logging-redaction.js';
import {
  REQUEST_ID_HEADER,
  REQUEST_ID_RESPONSE_HEADER,
  resolveRequestId,
} from './request-id.util.js';
import { resolveHttpLogLevel } from './http-log-level.util.js';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [EnvService],

      useFactory: (envService: EnvService) => ({
        pinoHttp: {
          level: envService.logLevel,

          redact: {
            paths: LOG_REDACTION_PATHS,
            censor: '[REDACTED]',
          },

          autoLogging: !envService.isTest,

          genReqId: (request, response) => {
            const requestId = resolveRequestId(
              request.headers[REQUEST_ID_HEADER],
            );

            response.setHeader(
              REQUEST_ID_RESPONSE_HEADER,
              requestId,
            );

            return requestId;
          },

          quietReqLogger: true,

          customAttributeKeys: {
            reqId: 'requestId',
          },

          customLogLevel: (
            request,
            response,
            error,
          ) =>
            resolveHttpLogLevel(
              request.url,
              response.statusCode,
              Boolean(error),
            ),
        },

        forRoutes: [
          {
            path: '{*path}',
            method: RequestMethod.ALL,
          },
        ],
      }),
    }),
  ],

  providers: [
    AppLogger,
  ],

  exports: [
    AppLogger,
  ],
})
export class LoggingModule {}

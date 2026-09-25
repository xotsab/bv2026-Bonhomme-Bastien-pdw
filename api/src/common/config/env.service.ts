import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppMode } from './data/enum/app-mode.enum.js';
import { ConfigKey } from './data/enum/config-key.enum.js';
import { LogLevel } from './data/enum/log-level.enum.js';
import { ValidatedEnvironment } from './environment/environment.validation.js';

@Injectable()
export class EnvService {
constructor(private readonly configService: ConfigService<ValidatedEnvironment,true>,) {}

  get appMode(): AppMode {
    return this.get(ConfigKey.NodeEnv);
  }

  get appPort(): number {
    return this.get(ConfigKey.AppPort);
  }

  get logLevel(): LogLevel {
    return this.get(ConfigKey.LogLevel);
  }

  get isProduction(): boolean {
    return this.appMode === AppMode.Prod;
  }

  get isTest(): boolean {
    return this.appMode === AppMode.Test;
  }
  get httpPayloadErrorStatusCode(): number {
    return this.get(ConfigKey.AppHttpPayloadErrorCode);
  }

  get<TConfigKey extends ConfigKey>(key: TConfigKey,): ValidatedEnvironment[TConfigKey & keyof ValidatedEnvironment] {
    return this.configService.getOrThrow(key, {infer: true,});
  }
}

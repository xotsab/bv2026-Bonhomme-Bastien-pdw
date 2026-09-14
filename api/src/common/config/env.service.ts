import { Injectable } from '@nestjs/common';
import { ValidatedEnvironment } from './environment/environment.validation.js';
import { ConfigKey } from './data/enum/config-key.enum.js';
import { AppMode } from './data/enum/app-mode.enum.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<
      ValidatedEnvironment,
      true
    >,
  ) {}

  get appPort(): number {
    return this.get(ConfigKey.AppPort);
  }

  get isProduction(): boolean {
    return this.get(ConfigKey.NodeEnv) === AppMode.Prod;
  }

  get<TConfigKey extends keyof ValidatedEnvironment>(
    key: TConfigKey,
  ): ValidatedEnvironment[TConfigKey] {
    return this.configService.getOrThrow(key, { infer: true });
  }
}

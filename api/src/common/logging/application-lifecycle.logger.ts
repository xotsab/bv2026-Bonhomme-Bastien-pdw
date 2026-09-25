import {Injectable,OnApplicationShutdown,} from '@nestjs/common';

import { AppLogger } from './app-logger.service.js';

@Injectable()
export class ApplicationLifecycleLogger implements OnApplicationShutdown{
  constructor(private readonly appLogger: AppLogger) {
    this.appLogger.setContext(ApplicationLifecycleLogger.name);
  }

  onApplicationShutdown(signal?: string): void {
    this.appLogger.application({event: 'application.stopped',signal});
  }
}

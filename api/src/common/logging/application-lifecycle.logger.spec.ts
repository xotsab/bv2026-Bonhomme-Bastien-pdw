import { type Mock, vi } from 'vitest';

import { AppLogger } from './app-logger.service.js';
import { ApplicationLifecycleLogger } from './application-lifecycle.logger.js';

type MockAppLogger = {
  setContext: Mock;
  application: Mock;
};

describe('ApplicationLifecycleLogger', () => {
  it('logs a structured application.stopped event on shutdown', () => {
    const mockAppLogger: MockAppLogger = {
      setContext: vi.fn(),
      application: vi.fn(),
    };

    const lifecycleLogger = new ApplicationLifecycleLogger(
      mockAppLogger as unknown as AppLogger,
    );

    lifecycleLogger.onApplicationShutdown('SIGTERM');

    expect(mockAppLogger.setContext).toHaveBeenCalledWith(
      'ApplicationLifecycleLogger',
    );
    expect(mockAppLogger.application).toHaveBeenCalledWith({
      event: 'application.stopped',
      signal: 'SIGTERM',
    });
  });
});

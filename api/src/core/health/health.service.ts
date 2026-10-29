import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  live(): { status: string } {
    return { status: 'ok' };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getstatus(): any {
        return { status: 'ok' }
    }
}

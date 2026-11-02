import { HttpStatus } from '@nestjs/common';

import {
  ApiCodeResponse,
  ApiException,
  ApiValidationError,
} from '../../../../common/api/index.js';

export class PasswordPolicyException extends ApiException<null> {
  constructor(validationErrors: ApiValidationError[]) {
    super({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      code: ApiCodeResponse.AuthPasswordPolicyInvalid,
      validationErrors,
      logMessage: 'Registration rejected by password policy',
    });
  }
}

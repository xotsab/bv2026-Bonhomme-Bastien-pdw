import { ApiProperty } from '@nestjs/swagger';

import { ApiCodeResponse } from '../enum/api-code-response.enum.js';
import { ApiValidationError } from './api-validation-error.js';


export type ApiResponseErrorOptions<T> = {
  code?: string;
  data?: T | null;
  validationErrors?: ApiValidationError[];
};

export class ApiResponse<T> {
  @ApiProperty({ example: ApiCodeResponse.CommonSuccess })
  code!: string;

  @ApiProperty({ example: true })
  result!: boolean;

  @ApiProperty({ nullable: true })
  data!: T | null;

  @ApiProperty({ type: () => [ApiValidationError] })
  validationErrors!: ApiValidationError[];

  static success<T>(
    data: T,
    code: string = ApiCodeResponse.CommonSuccess,
  ): ApiResponse<T> {
    return {
      code,
      result: true,
      data,
      validationErrors: [],
    };
  }

  static error<T = null>(
    options: ApiResponseErrorOptions<T> = {},
  ): ApiResponse<T> {
    return {
      code: options.code ?? ApiCodeResponse.CommonError,
      result: false,
      data: options.data ?? null,
      validationErrors: options.validationErrors ?? [],
    };
  }
}




import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import {
  ApiCodeResponse,
  ApiEnvelopeResponse,
  ApiErrorEnvelopeResponse,
  ApiSuccessCode,
} from '../../../common/api/index.js';
import { CurrentAuth } from '../../auth/decorator/current-auth.decorator.js';
import type { AuthContext } from '../../auth/data/model/auth-context.js';

import { AccountService } from '../account.service.js';
import { AccountResponseDto } from '../data/dto/response/account-response.dto.js';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  @Header('Cache-Control', 'no-store')
  @ApiCookieAuth('access-cookie')
  @ApiSuccessCode(ApiCodeResponse.AccountMeSuccess)
  @ApiEnvelopeResponse(AccountResponseDto, {
    code: ApiCodeResponse.AccountMeSuccess,
    description: 'Returns the currently authenticated account.',
  })
  @ApiErrorEnvelopeResponse({
    status: HttpStatus.UNAUTHORIZED,
    code: ApiCodeResponse.AuthUnauthorized,
    description: 'The access session is missing or invalid.',
  })
  @ApiErrorEnvelopeResponse({
    status: HttpStatus.NOT_FOUND,
    code: ApiCodeResponse.AccountNotFound,
    description: 'The authenticated account no longer exists.',
  })
  me(@CurrentAuth() auth: AuthContext): Promise<AccountResponseDto> {
    return this.accountService.me(auth.accountId);
  }
}

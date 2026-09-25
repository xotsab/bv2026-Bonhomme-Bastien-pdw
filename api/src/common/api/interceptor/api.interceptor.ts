import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ApiResponse } from '../data/model/api-response.js';
import {ApiCodeResponse} from '../data/enum/api-code-response.enum.js';
import { SKIP_API_TRANSFORM_METADATA_KEY } from '../decorator/skip-api-transform.decorator.js';
import { API_SUCCESS_CODE_METADATA_KEY } from '../decorator/api-success-code.decorator.js';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
 constructor(private readonly reflector: Reflector) {}
 intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
 const skipTransform = this.reflector.getAllAndOverride<boolean>(
 SKIP_API_TRANSFORM_METADATA_KEY,
 [context.getHandler(), context.getClass()],
 );
 if (skipTransform) {
 return next.handle();
 }
 const code =
 this.reflector.getAllAndOverride<string>(API_SUCCESS_CODE_METADATA_KEY, [
 context.getHandler(),
 context.getClass(),
 ]) ?? ApiCodeResponse.CommonSuccess;
 return next.handle().pipe(map((data) => ApiResponse.success(data, code)));
 }
}


import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';

export interface Response<T> {
    data: T;
    statusCode: number
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

        const ctx: HttpArgumentsHost = context.switchToHttp()

        const statusCode = ctx.getResponse<ExpressResponse>().statusCode


        return next.handle().pipe(map(data => ({
            statusCode,
            data
        })));
    }
}

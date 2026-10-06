import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isDbConnectionError = (err: unknown): boolean => {
      if (!err || typeof err !== 'object') return false;

      const anyErr = err as any;

      const code = anyErr.code;
      const msg = anyErr.message ?? '';

      const dbCodes = [
        'ETIMEDOUT',
        'ECONNREFUSED',
        'ENETUNREACH',
        'EHOSTUNREACH',
        'ENOTFOUND',
      ];

      if (dbCodes.includes(code)) return true;

      if (Array.isArray(anyErr.errors)) {
        return anyErr.errors.some((e: any) =>
          dbCodes.includes(e?.code) ||
          /ETIMEDOUT|ECONNREFUSED|ENETUNREACH|EHOSTUNREACH|ENOTFOUND/.test(e?.message ?? '')
        );
      }

      return /ETIMEDOUT|ECONNREFUSED|ENETUNREACH|EHOSTUNREACH|ENOTFOUND/.test(msg);
    };

    if (exception instanceof AggregateError || isDbConnectionError(exception)) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Database connection failed. Check the database host, port, and CONNECTION_STRING.',
      });
    }

    if (exception instanceof TypeError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();

      const message =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any)?.message ?? 'Internal server error';

      return response.status(status).json({
        statusCode: status,
        message,
      });
    }

    if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as {
        code?: string;
        detail?: string;
      };

      switch (driverError.code) {
        case '23505':
          return response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            message: driverError.detail,
          });

        case '23503':
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: driverError.detail,
          });

        case '23502':
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: driverError.detail,
          });

        case 'SQLITE_CONSTRAINT_UNIQUE':
          return response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            message: driverError.detail,
          });

        default:
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'A database error occurred.',
          });
      }
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
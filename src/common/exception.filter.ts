import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { } from '@nestjs/config'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

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
          console.error('Unhandled database error:', exception);

          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'A database error occurred.',
          });
      }
    }

    console.log(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
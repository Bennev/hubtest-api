import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DefaultError } from '../../../../applications/errors/default-error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../../../applications/errors/error-messages';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    let responseBody = {
      statusCode: 500,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      timestamp: new Date(),
    };
    let httpStatus = 500;

    if (exception instanceof DefaultError) {
      responseBody = {
        statusCode: exception.code,
        message: exception.message,
        timestamp: new Date(),
      };
      httpStatus = exception.code;
    }

    this.httpAdapterHost.httpAdapter.reply(
      host.switchToHttp().getResponse(),
      responseBody,
      httpStatus,
    );
  }
}

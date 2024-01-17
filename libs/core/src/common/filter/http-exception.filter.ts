import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

type HttpResponse = {
  status: number;
  data: any;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(httpException: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { status, data } = this.prepareResponse(httpException);
    return response.status(status).json(data);
  }

  private prepareResponse(httpException: HttpException): HttpResponse {
    const status =
      httpException instanceof HttpException
        ? httpException.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exception =
      httpException instanceof HttpException
        ? httpException.getResponse()
        : httpException;

    this.logger.error(`Exception  => ${JSON.stringify(exception)}`);
    const response = exception['message'] ?? exception;
    return Array.isArray(response)
      ? { status, data: { messages: response } }
      : { status, data: { message: response } };
  }
}

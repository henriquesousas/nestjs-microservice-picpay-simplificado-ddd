import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { Response } from 'express';

type HttpResponse = {
  status: number;
  data: any;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(httpException: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() as HttpArgumentsHost;
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { status, data } = this.prepareResponse(httpException, request);

    return response.status(status).json(data);
  }

  private prepareResponse(
    httpException: HttpException,
    request: Request,
  ): HttpResponse {
    const status =
      httpException instanceof HttpException
        ? httpException.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exception =
      httpException instanceof HttpException
        ? httpException.getResponse()
        : httpException;

    const response = exception['message'] ?? exception;
    // const errors = Array.isArray(response) ? response : [response];
    return {
      status,
      data: { messages: response },
    };

    // return errors.length > 1
    //   ? { status, data: { messages: errors, error: exception['error'] } }
    //   : { status, data: { message: errors[0], error: exception['error'] } };
  }
}

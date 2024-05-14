import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
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
  private readonly logger = new Logger(HttpExceptionFilter.name);

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

    this.logger.error(`Exception  => ${JSON.stringify(exception)}`);
    const response = exception['message'] ?? exception;
    const erros = Array.isArray(response) ? response : [response];
    return { status, data: { url: request.url, messages: erros } };
    // return Array.isArray(response)
    //   ? { status, data: { messages: response } }
    //   : { status, data: { message: [response] } };
  }
}

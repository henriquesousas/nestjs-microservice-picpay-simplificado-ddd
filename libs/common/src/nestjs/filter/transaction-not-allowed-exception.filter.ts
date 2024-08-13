import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(TrasferenceNotAllowed)
export class TransactionNotAllowedExceptionFilter implements ExceptionFilter {
  catch(exception: TrasferenceNotAllowed, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(403).json({
      message: exception.error[0],
    });
  }
}

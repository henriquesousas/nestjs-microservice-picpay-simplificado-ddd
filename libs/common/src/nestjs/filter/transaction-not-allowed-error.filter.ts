import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { TrasferenceNotAllowed } from '../../../../../src/core/transaction/domain/exception/transference-not-allowed.exception';

@Catch(TrasferenceNotAllowed)
export class TransactionNotAllowedErrorFilter implements ExceptionFilter {
  catch(exception: TrasferenceNotAllowed, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(403).json({
      message: exception.error[0],
    });
  }
}

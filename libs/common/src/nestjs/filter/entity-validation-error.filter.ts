import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityValidationException } from '../../core/domain/exception/entity-validation.exception';

//TODO: Testar essa classe
@Catch(EntityValidationException)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(422).json({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: exception.message,
    });
  }
}

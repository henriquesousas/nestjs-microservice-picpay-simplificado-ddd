import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Nack } from '@golevelup/nestjs-rabbitmq';
import { InvalidUuidError } from '../../../core/domain/exception/invalid-uuid.exception';

@Catch()
export class RabbitMQConsumeErrorFilter<T> implements ExceptionFilter {
  private static readonly NO_RETRY_ERROR = [
    InvalidUuidError,
    UnprocessableEntityException,
  ];

  catch(exception: any, host: ArgumentsHost) {
    if (host.getType<'rmq'>() !== 'rmq') {
      return;
    }
    const hasRetryError = RabbitMQConsumeErrorFilter.NO_RETRY_ERROR.some(
      (error) => exception instanceof error,
    );

    //nao reinfileira a mensagem pra reprocessamento (descarta a mensagem NACK)
    if (hasRetryError) {
      return new Nack(false);
    }
  }
}

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, UseFilters } from '@nestjs/common';
import { RabbitMQConsumeErrorFilter } from '../../../libs/common/src/nestjs/message-broker/rabbitmq/rabbitmq-consumer-error-filter';
import { NotFoundErrorFilter } from '../../../libs/common/src/nestjs/filter/not-found-error.filter';
import { InvalidUuidError } from '../../../libs/common/src/core/exception/invalid-uuid.error';

/**
 * Consumer podem receber outros usecases, outras classes que ajudem a completar a
 * regra de negócio especifica
 */

@UseFilters(new RabbitMQConsumeErrorFilter())
@Injectable()
export class CustomerConsumer {
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'customer.create',
    queue: 'micro-customer/admin',
    allowNonJsonMessages: true,
    queueOptions: {
      deadLetterExchange: 'dlx.exchange',
      deadLetterRoutingKey: 'customer.create',
      messageTtl: 5000, //tempo de vida da mensagem na fila para ser
    },
  })
  onCustomerCreated(message: { customer_id: string }) {
    //validar a mensagem que veio da fila
    //Pode usar uma abstracao do class validator
    //pode usar o flunt
    //pode usar a classe validation pipe
    throw new InvalidUuidError();
    console.log(message);
  }
}

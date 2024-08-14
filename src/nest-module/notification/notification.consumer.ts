import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, UseFilters } from '@nestjs/common';
import { RabbitMQConsumeErrorFilter } from '../../../libs/common/src/nestjs/message-broker/rabbitmq/rabbitmq-consumer-error-filter';

@UseFilters(new RabbitMQConsumeErrorFilter())
@Injectable()
export class NotificationConsumer {
  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'notification',
    queue: 'notification',
    allowNonJsonMessages: true,
    // queueOptions: {
    //   deadLetterExchange: 'dlx.exchange',
    //   deadLetterRoutingKey: 'customer.create',
    //   messageTtl: 5000, //tempo de vida da mensagem na fila para ser
    // },
  })
  /**
   * Este método esta consumindo a fila de noticacao que é uma exchange do tipo topic
   */
  onNotification(message: any) {
    console.log('Notificaiton consumer', message);
  }
}

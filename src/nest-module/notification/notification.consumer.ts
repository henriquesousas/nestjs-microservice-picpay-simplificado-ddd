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
  })
  onNotification(message: any) {
    console.log('Notificaiton consumer', message);
  }
}

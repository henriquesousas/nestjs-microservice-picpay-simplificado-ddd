import { Injectable } from '@nestjs/common';
import { EventHandler } from '../../../../@shared/event/EventHandler';
import { CustomerCreatedEvent } from '../CustomerCreatedEvent';
import { RabbitMQService } from '../../../../@shared/rabbitmq/RabbitMQService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendMessageToRabbitMQEventHandler
  implements EventHandler<CustomerCreatedEvent>
{
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly configService: ConfigService,
  ) {}

  handle(event: CustomerCreatedEvent): void {
    const queue = this.configService.getOrThrow('RABBIT_MQ_CUSTOMER_QUEUE');
    const routingKey = 'customer.create';
    this.rabbitMQService.getInstance(queue).emit(routingKey, event);
    // console.log(`SendMessageToRabbitMQEventHandler`, event);
  }
}

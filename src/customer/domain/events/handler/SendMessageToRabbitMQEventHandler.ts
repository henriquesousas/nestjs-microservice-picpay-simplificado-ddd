import { Injectable } from '@nestjs/common';
import { EventHandler } from '../../../../@shared/event/EventHandler';
import { CustomerCreatedEvent } from '../CustomerCreatedEvent';

//Injetar alguma implementacao que envia para algum message broker
@Injectable()
export class SendMessageToRabbitMQEventHandler
  implements EventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`SendMessageToRabbitMQEventHandler`, event);
  }
}

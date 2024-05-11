import { EventHandler } from '../../../../@shared/event/EventHandler';
import { CustomerCreatedEvent } from '../CustomerCreatedEvent';

export class SendMessageToRabbitMQEventHandler
  implements EventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`SendMessageToRabbitMQEventHandler`, event);
  }
}

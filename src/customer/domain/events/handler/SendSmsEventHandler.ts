import { EventHandler } from '../../../../@shared/event/EventHandler';
import { CustomerCreatedEvent } from '../CustomerCreatedEvent';

export class SendSmsEventHandler implements EventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Sending SMS', event);
  }
}

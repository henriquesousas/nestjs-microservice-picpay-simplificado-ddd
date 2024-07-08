import { OnEvent } from '@nestjs/event-emitter';
import { CustomerCreatedEvent } from '../../domain/events/customer-created.event';
import { IDomainEventHandler } from '../../../../../libs/common/src/core/event/domain-event.handler';

export class CustomerCreatedInQueueHandler implements IDomainEventHandler {
  @OnEvent(CustomerCreatedEvent.name)
  async handle(event: CustomerCreatedEvent): Promise<void> {
    console.log('Publicar na fila ', event);
  }
}

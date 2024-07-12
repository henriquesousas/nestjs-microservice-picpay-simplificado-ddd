import { OnEvent } from '@nestjs/event-emitter';
import { CustomerCreatedIntegrationEvent } from '../../domain/events/customer-created.event';
import { IDomainEvenIntegrationtHandler } from '../../../../../libs/common/src/core/event/domain-event.handler';

export class CustomerCreatedInQueueHandler
  implements IDomainEvenIntegrationtHandler
{
  /**
   *=====================================================================================
   * Caso queira deixar o handler ser o ouvinte do  event CustomerCreatedEvent
   * =====================================================================================
   */
  // @OnEvent(CustomerCreatedEvent.name)
  // async handle(event: CustomerCreatedEvent): Promise<void> {
  //   console.log('Publicar na fila ', event);
  // }

  @OnEvent(CustomerCreatedIntegrationEvent.name)
  async handle(event: CustomerCreatedIntegrationEvent): Promise<void> {
    console.log('Publicar na fila ', event);
  }
}

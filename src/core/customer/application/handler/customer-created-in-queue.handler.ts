import { OnEvent } from '@nestjs/event-emitter';
import { CustomerCreatedIntegrationEvent } from '../../domain/events/customer-created.event';
import { IDomainEvenIntegrationtHandler } from '../../../../../libs/common/src/core/event/domain-event.handler';
import { IMessageBroker } from '../../../../../libs/common/src/core/message-broker/message-broker.interface';

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

  constructor(private readonly messageBroker: IMessageBroker) {}

  //TODO: não publica todas as informacoes do objeto
  @OnEvent(CustomerCreatedIntegrationEvent.name)
  async handle(event: CustomerCreatedIntegrationEvent): Promise<void> {
    console.log('Publicando na fila', event);
    await this.messageBroker.publishEvent(event);
  }
}

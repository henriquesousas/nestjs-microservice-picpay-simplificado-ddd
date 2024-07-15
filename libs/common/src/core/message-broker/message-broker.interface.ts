import { IDomainEventIntegration } from '../event/domain-event-integration';

export interface IMessageBroker {
  publishEvent(event: IDomainEventIntegration): Promise<void>;
}

import { IDomainEventIntegration } from '../event/domain-event-integration';
import { IDomainEvent } from '../event/domain.event';

export interface IMessageBroker {
  publishEvent(event: IDomainEventIntegration): Promise<void>;
}

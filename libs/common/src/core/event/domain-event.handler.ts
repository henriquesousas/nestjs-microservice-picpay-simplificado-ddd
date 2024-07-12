import { IDomainEventIntegration } from './domain-event-integration';
import { IDomainEvent } from './domain.event';

export interface IDomainEventHandler {
  handle(event: IDomainEvent): Promise<void>;
}

export interface IDomainEvenIntegrationtHandler {
  handle(event: IDomainEventIntegration): Promise<void>;
}

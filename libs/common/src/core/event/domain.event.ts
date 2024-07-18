import { IDomainEventIntegration } from './domain-event-integration';

export interface IDomainEvent {
  aggregateId: string;
  occurredOn: Date;
  eventVersion: number;

  getIntegrationEvent?(): IDomainEventIntegration;
}

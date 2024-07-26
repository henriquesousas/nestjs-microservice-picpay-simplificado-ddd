import { IDomainEventIntegration } from '../../../../../libs/common/src/core/event/domain-event-integration';
import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { TransactionType } from '../entity/transaction';
import { TransactionCreatedIntegrationEvent } from './transaction-cretated-integration.event';

export class TransactionCreatedEvent implements IDomainEvent {
  occurredOn: Date = new Date();
  eventVersion: number = 1;

  constructor(
    public readonly aggregateId: string,
    public readonly occurred_on: Date,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly sender: string,
    public readonly receiver?: string,
  ) {}

  getIntegrationEvent(): IDomainEventIntegration {
    return new TransactionCreatedIntegrationEvent(this);
  }
}

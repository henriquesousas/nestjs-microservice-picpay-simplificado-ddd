import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';

export class TransactionCreatedEvent implements IDomainEvent {
  aggregateId: string;
  readonly occurredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor() {}
}

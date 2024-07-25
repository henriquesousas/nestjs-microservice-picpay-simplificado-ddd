import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { TransactionType } from '../entity/transaction';

export class DidCreditOrDebitEvent implements IDomainEvent {
  aggregateId: string;
  occurredOn: Date = new Date();
  eventVersion: number = 1;

  constructor(readonly type: TransactionType) {}
}

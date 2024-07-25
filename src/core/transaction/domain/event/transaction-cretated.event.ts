import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { TransactionType } from '../entity/transaction';

//TODO: Renomear para indicar que houve uma operacao de transacao
export class TransactionCreatedEvent implements IDomainEvent {
  aggregateId: string;
  readonly occurredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor(private readonly type: TransactionType) {}
}

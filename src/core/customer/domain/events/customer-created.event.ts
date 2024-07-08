import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { Customer } from '../entity/customer';

export class CustomerCreatedEvent implements IDomainEvent {
  readonly aggregateId: Uuid;
  readonly occuredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor(public readonly payload: Customer) {}
}

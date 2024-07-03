import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';

export class CustomerCreatedEvent implements IDomainEvent {
  readonly aggregateId: Uuid;
  readonly occuredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor(public readonly valueObjects: ValueObject[]) {}
}

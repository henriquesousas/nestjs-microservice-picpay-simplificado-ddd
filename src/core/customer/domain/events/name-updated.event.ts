import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';

export class NameUpdatedEvent implements IDomainEvent {
  readonly aggregateId: Uuid;
  readonly occurredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor() {}
}

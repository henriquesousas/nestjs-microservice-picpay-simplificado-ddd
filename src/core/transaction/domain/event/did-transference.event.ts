import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';

export class DidTransferenceEvent implements IDomainEvent {
  aggregateId: string;
  occurredOn: Date = new Date();
  eventVersion: number = 1;

  constructor(readonly receiver: string, readonly value: number) {}
}

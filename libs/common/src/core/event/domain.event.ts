import { Uuid } from '../value-object/uuid';

export interface IDomainEvent {
  aggregateId: Uuid;
  occuredOn: Date;
  eventVersion: number;
}

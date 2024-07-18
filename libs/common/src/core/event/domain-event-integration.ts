import { Uuid } from '../domain/value-object/uuid';

export interface IDomainEventIntegration<T = any> {
  aggregateId: Uuid;
  occurredOn: Date;
  eventVersion: number;
  eventName: string;
  payload: T;
}

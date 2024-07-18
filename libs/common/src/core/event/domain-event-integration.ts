export interface IDomainEventIntegration<T = any> {
  aggregateId: string;
  occurredOn: Date;
  eventVersion: number;
  eventName: string;
  payload: T;
}

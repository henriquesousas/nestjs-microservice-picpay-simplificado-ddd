import { IDomainEvent } from './domain.event';

export interface IDomainEventHandler {
  handle(event: IDomainEvent): Promise<void>;
}

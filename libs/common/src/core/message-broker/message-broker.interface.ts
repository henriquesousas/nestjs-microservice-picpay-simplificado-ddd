import { IDomainEvent } from '../event/domain.event';

export interface IMessageBroker {
  publishEvent(event: IDomainEvent): Promise<void>;
}

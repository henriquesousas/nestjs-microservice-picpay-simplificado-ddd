import { IDomainEventIntegration } from '../../../../../libs/common/src/core/event/domain-event-integration';
import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';

import { Customer } from '../entity/customer';

export class CustomerCreatedEvent implements IDomainEvent {
  readonly aggregateId: string;
  readonly occurredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor(readonly customer: Customer) {
    this.aggregateId = customer.getUUid().id;
  }

  getIntegrationEvent(): CustomerCreatedIntegrationEvent {
    return new CustomerCreatedIntegrationEvent(this);
  }
}

export type EventPayload = {
  first_name: string;
  sur_name: string;
  balance: number;
  email: string;
};

export class CustomerCreatedIntegrationEvent
  implements IDomainEventIntegration
{
  aggregateId: string;
  occurredOn: Date;
  eventVersion: number;
  eventName: string;
  payload: EventPayload;

  constructor(readonly event: CustomerCreatedEvent) {
    this.aggregateId = event.aggregateId;
    this.eventName = CustomerCreatedIntegrationEvent.name;
    this.eventVersion = event.eventVersion;
    this.occurredOn = event.occurredOn;
    this.payload = {
      first_name: event.customer.props.name.getfirstName,
      sur_name: event.customer.props.name.getSurName,
      balance: event.customer.props.wallet!.balance,
      email: event.customer.props.email.getEmail(),
    };
  }
}

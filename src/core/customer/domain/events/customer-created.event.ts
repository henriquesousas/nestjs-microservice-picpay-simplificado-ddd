import { IDomainEventIntegration } from '../../../../../libs/common/src/core/event/domain-event-integration';
import { IDomainEvent } from '../../../../../libs/common/src/core/event/domain.event';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { Customer } from '../entity/customer';

export class CustomerCreatedEvent implements IDomainEvent {
  readonly aggregateId: Uuid;
  readonly occurredOn: Date = new Date();
  readonly eventVersion: number = 1;

  constructor(readonly customer: Customer) {}

  getIntegrationEvent(): CustomerCreatedIntegrationEvent {
    return new CustomerCreatedIntegrationEvent(this);
  }
}

export class CustomerCreatedIntegrationEvent
  implements IDomainEventIntegration
{
  aggregateId: Uuid;
  occurredOn: Date;
  eventVersion: number;
  eventName: string;
  payload: any;

  constructor(private readonly event: CustomerCreatedEvent) {
    this.aggregateId = event.aggregateId;
    this.eventName = CustomerCreatedEvent.name;
    this.eventVersion = event.eventVersion;
    this.occurredOn = this.occurredOn;
    this.payload = {
      firstName: event.customer.props.name.getfirstName,
      surName: event.customer.props.name.getSurName,
      email: event.customer.props.email.getEmail(),
      password: event.customer.props.password.getValue(),
      //outros campos do aggregate que queira salvar no message broker (RabbitMQ)
    };
  }
}

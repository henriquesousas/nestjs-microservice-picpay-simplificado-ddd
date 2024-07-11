import { CustomerCreatedEvent } from '../../../../../src/core/customer/domain/events/customer-created.event';

export const EVENSTS_MESSAGE_BROKER_CONFIG = {
  [CustomerCreatedEvent.name]: {
    exchange: 'amq.direct',
    routing_key: CustomerCreatedEvent.name,
  },
  TestEvent: {
    exchange: 'test-exchange',
    routing_key: 'TestEvent',
  },
};

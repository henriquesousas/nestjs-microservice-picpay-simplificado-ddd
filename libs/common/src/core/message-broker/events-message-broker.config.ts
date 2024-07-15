import { CustomerCreatedIntegrationEvent } from '../../../../../src/core/customer/domain/events/customer-created.event';

export const EVENSTS_MESSAGE_BROKER_CONFIG = {
  [CustomerCreatedIntegrationEvent.name]: {
    exchange: 'amq.direct',
    routing_key: CustomerCreatedIntegrationEvent.name,
  },
  TestEvent: {
    exchange: 'test-exchange',
    routing_key: 'TestEvent',
  },
};

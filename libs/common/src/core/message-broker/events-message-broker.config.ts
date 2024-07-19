import { CustomerCreatedIntegrationEvent } from '../../../../../src/core/customer/domain/events/customer-created.event';

export const EVENSTS_MESSAGE_BROKER_CONFIG = {
  [CustomerCreatedIntegrationEvent.name]: {
    exchange: 'amq.topic',
    // routing_key: CustomerCreatedIntegrationEvent.name,
    routing_key: 'customer-created.notification',
  },
  TestEvent: {
    exchange: 'test-exchange',
    routing_key: 'TestEvent',
  },
};

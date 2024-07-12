import { RabbitMQMessageBroker } from '../rabbitmq-message-broker';
import { IDomainEvent } from '../../../event/domain.event';
import { Uuid } from '../../../value-object/uuid';
import { EVENSTS_MESSAGE_BROKER_CONFIG } from '../../events-message-broker.config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

class TestEvent implements IDomainEvent {
  occurredOn: Date = new Date();
  readonly eventVersion: 1;
  constructor(readonly aggregateId: Uuid) {}
}

describe('RabbitMQMessageBroker Unit Tests', () => {
  let conn: AmqpConnection;
  beforeEach(() => {
    conn = {
      publish: jest.fn(),
    } as any;
  });

  it('should call publish event to channel', () => {
    const event = new TestEvent(new Uuid());
    const sut = new RabbitMQMessageBroker(conn as any);
    sut.publishEvent(event);

    expect(conn.publish).toHaveBeenCalledWith(
      EVENSTS_MESSAGE_BROKER_CONFIG[TestEvent.name].exchange,
      EVENSTS_MESSAGE_BROKER_CONFIG[TestEvent.name].routing_key,
      event,
    );
  });
});

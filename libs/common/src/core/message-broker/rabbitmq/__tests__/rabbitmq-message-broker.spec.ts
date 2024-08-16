import { EVENSTS_MESSAGE_BROKER_CONFIG } from '../../events-message-broker.config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IDomainEventIntegration } from '../../../event/domain-event-integration';
import { Uuid } from '../../../value-object/uuid';

class TestEvent implements IDomainEventIntegration {
  public aggregateId: string;
  public occurredOn: Date = new Date();
  public eventVersion: number = 1;
  public eventName: 'TestEvent';
  public payload: any;
  constructor(aggregateId: string) {
    this.aggregateId = aggregateId;
    this.payload = {
      message: 'ok',
    };
  }
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

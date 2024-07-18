import { RabbitMQMessageBroker } from '../rabbitmq-message-broker';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { IDomainEvent } from '../../../event/domain.event';
import { Uuid } from '../../../domain/entity/value-object/uuid';
import { AppConfig } from '../../../config/app.config';
import { IDomainEventIntegration } from '../../../event/domain-event-integration';

class TestEvent implements IDomainEventIntegration {
  public occurredOn: Date = new Date();
  public eventVersion: number = 1;
  public eventName: 'TestEvent';
  public payload: any;
  constructor(readonly aggregateId: Uuid) {
    this.payload = {
      message: 'ok',
    };
  }
}

describe('RabbitMQMessageBroker Integration tests', () => {
  let service: RabbitMQMessageBroker;
  let connection: AmqpConnection;

  beforeEach(async () => {
    connection = new AmqpConnection({
      uri: AppConfig.rabbitmqUri(),
      connectionInitOptions: { wait: true },
      logger: {
        debug: () => {},
        error: () => {},
        info: () => {},
        warn: () => {},
        log: () => {},
      } as any,
    });

    await connection.init();
    const channel = connection.channel;

    await channel.assertExchange('test-exchange', 'direct', {
      durable: false,
    });
    await channel.assertQueue('test-queue', { durable: false });
    await channel.purgeQueue('test-queue');
    //TestEvent é a routing_keyx
    await channel.bindQueue('test-queue', 'test-exchange', 'TestEvent');
    service = new RabbitMQMessageBroker(connection);
  });

  afterEach(async () => {
    try {
      await connection.managedConnection.close();
    } catch (err) {}
  });

  describe('publish', () => {
    it('should publish events to channel', async () => {
      const event = new TestEvent(new Uuid());

      await service.publishEvent(event);

      const msg: ConsumeMessage = await new Promise((resolve) => {
        connection.channel.consume('test-queue', (msg) => {
          resolve(msg as any);
        });
      });
      const msgObj = JSON.parse(msg.content.toString());
      expect(msgObj.aggregateId.id).toEqual(event.aggregateId.id);
      expect(msgObj.occuredOn).toEqual(event.occurredOn.toISOString());
    });
  });
});

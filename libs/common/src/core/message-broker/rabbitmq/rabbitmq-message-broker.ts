import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IDomainEvent } from '../../event/domain.event';
import { IMessageBroker } from '../message-broker.interface';
import { EVENSTS_MESSAGE_BROKER_CONFIG } from '../events-message-broker.config';

export class RabbitMQMessageBroker implements IMessageBroker {
  constructor(private readonly conn: AmqpConnection) {}

  async publishEvent(event: IDomainEvent): Promise<void> {
    const config = EVENSTS_MESSAGE_BROKER_CONFIG[event.constructor.name];
    this.conn.publish(config.exchange, config.routing_key, event);
  }
}

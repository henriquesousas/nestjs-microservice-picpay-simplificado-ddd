import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IMessageBroker } from '../message-broker.interface';
import { EVENSTS_MESSAGE_BROKER_CONFIG } from '../events-message-broker.config';
import { IDomainEventIntegration } from '../../event/domain-event-integration';

export class RabbitMQMessageBroker implements IMessageBroker {
  constructor(private readonly conn: AmqpConnection) {}

  async publishEvent(event: IDomainEventIntegration): Promise<void> {
    const config = EVENSTS_MESSAGE_BROKER_CONFIG[event.constructor.name];
    this.conn.publish(config.exchange, config.routing_key, event);
  }
}

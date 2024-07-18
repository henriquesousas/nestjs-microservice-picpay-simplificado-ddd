import EventEmitter2 from 'eventemitter2';
import { AggregateRoot } from '../domain/entity/aggregate_root';

//TODO: Tipar handler
export class DomainEventMediator {
  constructor(private eventEmitter: EventEmitter2) {}

  //TODO: Metodo nao esta sendo chamado
  register(event: string, handler: any): void {
    this.eventEmitter.on(event, handler);
  }

  async publish(aggregateRoot: AggregateRoot): Promise<void> {
    for (const event of aggregateRoot.getUnDispatchedEvents()) {
      const eventName = event.constructor.name;
      aggregateRoot.markEventAsDispatched(event);
      await this.eventEmitter.emitAsync(eventName, event);
    }
  }

  async publishIntegrationEvents(aggregateRoot: AggregateRoot): Promise<void> {
    for (const event of aggregateRoot.events) {
      const integrationEvent = event.getIntegrationEvent?.();

      if (!integrationEvent) continue;

      await this.eventEmitter.emitAsync(
        integrationEvent.constructor.name,
        integrationEvent,
      );
    }
  }
}

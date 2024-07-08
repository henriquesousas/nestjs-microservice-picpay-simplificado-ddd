import EventEmitter2 from 'eventemitter2';
import { AggregateRoot } from '../entity/aggregate_root';

//TODO: Tipar handler
export class DomainEventMediator {
  constructor(private eventEmitter: EventEmitter2) {}

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
}

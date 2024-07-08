import EventEmitter2 from 'eventemitter2';
import { Entity } from './entity';
import { IDomainEvent } from '../event/domain.event';

export abstract class AggregateRoot extends Entity {
  private events: Set<IDomainEvent> = new Set<IDomainEvent>();
  private dispatchedchEvents: Set<IDomainEvent> = new Set<IDomainEvent>();
  localMediator = new EventEmitter2();

  applyEvent(event: IDomainEvent) {
    this.events.add(event);
    this.localMediator.emit(event.constructor.name, event);
  }

  registerHandler(event: string, handler: (event: IDomainEvent) => void) {
    this.localMediator.on(event, handler);
  }

  markEventAsDispatched(event: IDomainEvent): void {
    this.dispatchedchEvents.add(event);
  }

  getUnDispatchedEvents(): IDomainEvent[] {
    return Array.from(this.events).filter(
      (event) => !this.dispatchedchEvents.has(event),
    );
  }

  clear(): void {
    this.events.clear();
    this.dispatchedchEvents.clear();
  }
}

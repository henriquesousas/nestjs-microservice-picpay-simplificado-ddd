import EventEmitter2 from 'eventemitter2';
import { DomainEventMediator } from '../domain-event.mediator';
import { IDomainEvent } from '../domain.event';
import { AggregateRoot } from '../../domain/entity/aggregate_root';
import { Uuid } from '../../domain/value-object/uuid';

class StubEvent implements IDomainEvent {
  aggregateId: Uuid;
  occurredOn: Date;
  eventVersion: number;
  payload: string;

  constructor(payload: string) {
    this.occurredOn = new Date();
    this.aggregateId = new Uuid();
    this.eventVersion = 1;
    this.payload = payload;
  }
}

class StubEvent2 extends StubEvent {}

class StubAggregateRoot extends AggregateRoot {
  getUUid(): Uuid {
    return new Uuid();
  }
  name: string;

  async fakeMethodNameToUpperCase(name: string): Promise<void> {
    this.name = name.toUpperCase();
    this.applyEvent(new StubEvent(this.name));
    this.applyEvent(new StubEvent2(this.name));
  }
}

describe('DomainEventMediator Unit Test', () => {
  it('should public an event ', async () => {
    const eventEmmiter = new EventEmitter2();
    const sut = new DomainEventMediator(eventEmmiter);

    // expect.assertions(3);
    //Registra enventos (listeners)
    sut.register(StubEvent.name, (event: StubEvent) => {
      // console.log('event 1', event.payload);
      expect(event.payload).toBe('NAME');
    });

    sut.register(StubEvent2.name, (event: StubEvent) => {
      // console.log('event 2', event.payload);
      expect(event.payload).toBe('NAME');
    });

    //Aggegado
    const aggregateRoot = new StubAggregateRoot();
    aggregateRoot.fakeMethodNameToUpperCase('name');

    //Publica os eventos que ja registados no aggregado
    await sut.publish(aggregateRoot);

    expect(aggregateRoot.getUnDispatchedEvents().length).toBe(0);
  });
});

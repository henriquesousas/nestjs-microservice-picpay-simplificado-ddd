import { Uuid } from '../../value-object/uuid';
import { AggregateRoot } from '../aggregate_root';
import { IDomainEvent } from '../../event/domain.event';

class NameChangedEventStub implements IDomainEvent {
  aggregateId: Uuid;
  occurredOn: Date;
  eventVersion = 1;
  name: string;

  constructor(aggregateId: Uuid, name: string) {
    this.aggregateId = aggregateId;
    this.occurredOn = new Date();
    this.name = name;
  }
}

class AggregateRootStub extends AggregateRoot {
  aggregrateId = new Uuid();
  name: string;
  field: string;

  constructor(name: string) {
    super();
    this.name = name;
    this.registerHandler(
      NameChangedEventStub.name,
      this.onNameChangedEvent.bind(this),
    );
  }

  get getUUid(): Uuid {
    return this.aggregrateId;
  }

  changeNameToUpperCase(): void {
    this.name = this.name.toUpperCase();
    this.applyEvent(new NameChangedEventStub(this.getUUid, this.name));
  }

  onNameChangedEvent(event: NameChangedEventStub) {
    this.field = event.name;
  }
}

describe('Aggregate root unit tests', () => {
  it('should dispatcher events', () => {
    const entity = new AggregateRootStub('name');
    entity.changeNameToUpperCase();
    expect(entity.field).toBe('NAME');
  });
});

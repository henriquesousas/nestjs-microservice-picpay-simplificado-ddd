import { AggregateRoot } from '../../entity/aggregate_root';
import { UnitOfWork } from '../unit-of-work';

export class StubUnitOfWork implements UnitOfWork {
  async start(): Promise<void> {
    return;
  }
  async commit(): Promise<void> {
    return;
  }
  async rollback(): Promise<void> {
    return;
  }
  getTransaction() {
    return;
  }
  do<T>(workFn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return workFn(this);
  }

  addAggregateRoot(aggregateRoot: AggregateRoot): void {
    throw new Error('Method not implemented.');
  }

  getAggregateRoots(): AggregateRoot[] {
    throw new Error('Method not implemented.');
  }
}

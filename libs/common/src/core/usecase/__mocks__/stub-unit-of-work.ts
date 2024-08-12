import { UnitOfWork } from '../../application/unit-of-work';
import { AggregateRoot } from '../../entity/aggregate_root';

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

  addAggregateRoot(aggregateRoot: AggregateRoot): void {}

  getAggregateRoots(): AggregateRoot[] {
    return [];
  }
}

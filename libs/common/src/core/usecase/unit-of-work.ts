import { AggregateRoot } from '../entity/aggregate_root';

export interface UnitOfWork {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getTransaction(): any;
  do<T>(workFn: (uow: UnitOfWork) => Promise<T>): Promise<T>;
  addAggregateRoot(aggregateRoot: AggregateRoot): void;
  getAggregateRoots(): AggregateRoot[];
}

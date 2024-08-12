import Transaction from 'sequelize/types/transaction';
import { Sequelize } from 'sequelize-typescript';
import { UnitOfWork } from '../../../core/application/unit-of-work';
import { AggregateRoot } from '../../../core/entity/aggregate_root';

export class UnitOfWorkSequelize implements UnitOfWork {
  private transaction: Transaction | null;
  private aggregateRoots: Set<AggregateRoot> = new Set<AggregateRoot>();

  constructor(private sequelize: Sequelize) {}

  async start(): Promise<void> {
    if (!this.transaction) {
      this.transaction = await this.sequelize.transaction();
    }
  }

  async commit(): Promise<void> {
    this.validateTransaction();
    await this.transaction!.commit();
    this.transaction = null;
  }

  async rollback(): Promise<void> {
    this.validateTransaction();
    await this.transaction!.rollback();
    this.transaction = null;
  }

  public getTransaction(): Transaction | null {
    return this.transaction;
  }

  async do<T>(workFn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    let isAutoTransaction = false;
    try {
      if (this.transaction) {
        const result = await workFn(this);
        this.transaction = null;
        return result;
      }
      return await this.sequelize.transaction(async (t) => {
        isAutoTransaction = true;
        this.transaction = t;
        const result = await workFn(this);
        this.transaction = null;
        return result;
      });
    } catch (e) {
      if (!isAutoTransaction) {
        this.transaction?.rollback();
      }
      this.transaction = null;
      throw e;
    }
  }

  addAggregateRoot(aggregateRoot: AggregateRoot): void {
    this.aggregateRoots.add(aggregateRoot);
  }

  getAggregateRoots(): AggregateRoot[] {
    return [...this.aggregateRoots];
  }

  private validateTransaction() {
    if (!this.transaction) {
      throw new Error('No transaction started');
    }
  }
}

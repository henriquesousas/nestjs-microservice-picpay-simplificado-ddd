import { UnitOfWork } from './unit-of-work';
import { DomainEventMediator } from '../event/domain-event.mediator';

export class ApplicationService {
  constructor(
    private uow: UnitOfWork,
    private domainEventMediador: DomainEventMediator,
  ) {}

  async start(): Promise<void> {
    this.uow.start();
  }

  async finish(): Promise<void> {
    const aggregateRoots = [...this.uow.getAggregateRoots()];
    for (const aggregateRoot of aggregateRoots) {
      await this.domainEventMediador.publish(aggregateRoot);
    }
    this.uow.commit();
  }

  async fail(): Promise<void> {
    this.uow.rollback();
  }

  async run<T>(callback: () => Promise<T>): Promise<T> {
    await this.start();
    try {
      const result = await callback();
      await this.finish();
      return result;
    } catch (error) {
      await this.fail();
      throw error;
    }
  }
}

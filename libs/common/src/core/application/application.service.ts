import { DomainEventMediator } from '../event/domain-event.mediator';
import { UnitOfWork } from './unit-of-work';

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
      //Não necessariamente esse puslish será em uma fila, pode ser uma regra de negócio, neste caso
      //não podemos dar um commit sem ante se certificar que toda a regra foi executado com sucesso.
      //Para isso foi criado um DomainEventIntegration.

      await this.domainEventMediador.publish(aggregateRoot);
    }
    this.uow.commit();

    // Se todas os handlers de dominio foram executados com sucesso
    for (const aggregateRoot of aggregateRoots) {
      await this.domainEventMediador.publishIntegrationEvents(aggregateRoot);
    }
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

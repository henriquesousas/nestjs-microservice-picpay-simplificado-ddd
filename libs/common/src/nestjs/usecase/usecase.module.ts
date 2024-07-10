import { Global, Module } from '@nestjs/common';
import { ApplicationService } from '../../core/usecase/application.service';
import { UnitOfWork } from '../../core/usecase/unit-of-work';
import { DomainEventMediator } from '../../core/event/domain-event.mediator';

@Global()
@Module({
  providers: [
    {
      provide: ApplicationService,
      useFactory: (
        uow: UnitOfWork,
        domainEventMediator: DomainEventMediator,
      ) => {
        return new ApplicationService(uow, domainEventMediator);
      },
      inject: ['UnitOfWork', DomainEventMediator],
    },
  ],
  exports: [ApplicationService],
})
export class UseCaseModule {}

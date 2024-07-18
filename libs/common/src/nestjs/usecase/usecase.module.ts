import { Global, Module } from '@nestjs/common';

import { UnitOfWork } from '../../core/application/unit-of-work';
import { DomainEventMediator } from '../../core/event/domain-event.mediator';
import { ApplicationService } from '../../core/application/application.service';

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

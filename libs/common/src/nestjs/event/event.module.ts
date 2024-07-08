import { Global, Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { DomainEventMediator } from '../../core/event/domain-event.mediator';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: DomainEventMediator,
      useFactory: (eventEmitter: EventEmitter2) => {
        return new DomainEventMediator(eventEmitter);
      },
      inject: [EventEmitter2],
    },
  ],
  exports: [DomainEventMediator],
})
export class EventModule {}

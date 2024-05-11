import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './infrastructure/http/nestjs/CustomerController';
import {
  CREATE_CUSTOMER_USECASE,
  CreateCustomerUseCase,
} from './domain/usecase/CreateCustomerUseCase';
import {
  CUSTOMER_REPOSITORY_TOKEN,
  CustomerRepository,
} from './domain/repository/CustomerRepository';
import {
  Dispatcher,
  EVENT_DISPATCHER_TOKERN,
} from '../@shared/event/Dispatcher';
import { CustomerRepositoryTypeOrm } from './infrastructure/db/typeorm/CustomerRepositoryTypeOrm';
import { EventDispatcher } from '../@shared/event/EventDispatcher';

@Module({
  imports: [TypeOrmModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: CREATE_CUSTOMER_USECASE,
      useFactory(repository: CustomerRepository, eventDispatcher: Dispatcher) {
        return new CreateCustomerUseCase(
          repository,
          eventDispatcher,
          'CustomerCreatedEvent',
        );
      },
      inject: [CUSTOMER_REPOSITORY_TOKEN, EVENT_DISPATCHER_TOKERN],
    },
    {
      provide: CUSTOMER_REPOSITORY_TOKEN,
      useClass: CustomerRepositoryTypeOrm,
    },
    {
      provide: EVENT_DISPATCHER_TOKERN,
      useClass: EventDispatcher,
    },
  ],
  exports: [CUSTOMER_REPOSITORY_TOKEN],
})
export class CustomerModule {}

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
import { SendMessageToRabbitMQEventHandler } from './domain/events/handler/SendMessageToRabbitMQEventHandler';
import { EventDispatcher } from '../@shared/event/EventDispatcher';
import { SendEmailEventHandler } from './domain/events/handler/SendEmailEventHandler';

const useCaseProvider = {
  provide: CREATE_CUSTOMER_USECASE,
  useFactory(repository: CustomerRepository, eventDispatcher: Dispatcher) {
    const eventName = 'CustomerCreatedEvent';
    return new CreateCustomerUseCase(repository, eventDispatcher, eventName);
  },
  inject: [
    CUSTOMER_REPOSITORY_TOKEN,
    EVENT_DISPATCHER_TOKERN,
    SendMessageToRabbitMQEventHandler,
  ],
};

const eventsProvider = {
  provide: EVENT_DISPATCHER_TOKERN,
  useFactory(
    event: SendMessageToRabbitMQEventHandler,
    eventSendEmail: SendEmailEventHandler,
    eventDispatcher: EventDispatcher,
  ) {
    eventDispatcher.register('CustomerCreatedEvent', event);
    eventDispatcher.register('CustomerCreatedEvent', eventSendEmail);
    return eventDispatcher;
  },
  inject: [
    SendMessageToRabbitMQEventHandler,
    SendEmailEventHandler,
    EventDispatcher,
  ],
};

const repositoryProvider = {
  provide: CUSTOMER_REPOSITORY_TOKEN,
  useClass: CustomerRepositoryTypeOrm,
};

@Module({
  imports: [TypeOrmModule],
  controllers: [CustomerController],
  providers: [
    EventDispatcher,
    SendMessageToRabbitMQEventHandler,
    SendEmailEventHandler,
    repositoryProvider,
    eventsProvider,
    useCaseProvider,
  ],
  exports: [CUSTOMER_REPOSITORY_TOKEN],
})
export class CustomerModule {}

import { Inject, Injectable } from '@nestjs/common';
import { Result } from '../../../@shared/types/types';

import { CustomerBuild } from '../build/CustomerBuild';
import { CreateCustomerDto } from '../dto/CreateCustomerDto';
import { CustomerCreatedEvent } from '../events/CustomerCreatedEvent';
import {
  CUSTOMER_REPOSITORY_TOKEN,
  CustomerRepository,
} from '../repository/CustomerRepository';
import {
  Dispatcher,
  EVENT_DISPATCHER_TOKERN,
} from '../../../@shared/event/Dispatcher';
import { CustomerAlreadyExistException } from '../exception/CustomerAlreadyExistException';
import { Wallet } from '../value-object/Wallet';

export const CREATE_CUSTOMER_USECASE = 'CreateCustomer';

export interface CreateCustomer {
  execute(dto: CreateCustomerDto): Promise<Result<void>>;
}

@Injectable()
export class CreateCustomerUseCase implements CreateCustomer {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_TOKEN)
    private readonly customerRepository: CustomerRepository,
    @Inject(EVENT_DISPATCHER_TOKERN)
    private readonly eventDispatcher: Dispatcher,
    private readonly eventName: string,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Result<void>> {
    const customerFromDb = await this.customerRepository.getByEmailOrDocument(
      dto.email,
      dto.document,
    );
    if (customerFromDb) {
      return new CustomerAlreadyExistException();
    }
    const customer = new CustomerBuild(
      dto.firstName,
      dto.surName,
      dto.email,
      dto.password,
      dto.document,
      dto.documentType,
    )
      .withWallet(new Wallet(dto.amount))
      .build();
    await this.customerRepository.save(customer);
    this.eventDispatcher.notify(new CustomerCreatedEvent(this.eventName, dto));
  }
}

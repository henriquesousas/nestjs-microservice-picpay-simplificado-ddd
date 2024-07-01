import { Entity } from 'typeorm';
import { UnitOfWork } from '../../../../../@shared/db/unit-of-work';
import { DocumentFactory } from '../../../../../@shared/document';
import { Either } from '../../../../../@shared/types/either';
import { UseCase } from '../../../../../@shared/usecase';
import { CustomerBuild } from '../../../../domain/customer.build';
import { CustomerRepository } from '../../../../domain/customer.repository';
import { Customer } from '../../../../domain/entity/customer';
import { CustomerAlreadyExistException } from '../../../../domain/exception/customer-already-exist.exception';
import { CreateCustomerDto } from './create-customer.dto';
import { EntityValidationError } from '../../../../../@shared/exception/entity-validation.error';

export type CustomerOutputDto = Either<Customer>;

export class CreateCustomerUseCase
  implements UseCase<CreateCustomerDto, CustomerOutputDto>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<CustomerOutputDto> {
    const customerFromDb = await this.customerRepository.findByEmail(dto.email);
    if (customerFromDb) {
      return Either.fail(new CustomerAlreadyExistException());
    }

    const customer = new CustomerBuild(dto).withBalance(dto.balance).build();

    if (customer.notification.hasErrors()) {
      const error = new EntityValidationError(customer.notification.toArray());
      return Either.fail(error);
    }

    await this.uow.do(async () => {
      return this.customerRepository.insert(customer);
    });

    return Either.ok(customer);
  }
}

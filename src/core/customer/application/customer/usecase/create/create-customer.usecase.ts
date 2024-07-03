import { Either } from '../../../../../../../libs/common/src/core/types/either';
import { CustomerBuild } from '../../../../domain/customer.build';
import { CustomerRepository } from '../../../../domain/customer.repository';
import { Customer } from '../../../../domain/entity/customer';
import { CustomerAlreadyExistException } from '../../../../domain/exception/customer-already-exist.exception';
import { CreateCustomerDto } from './create-customer.dto';
import { EntityValidationError } from '../../../../../../../libs/common/src/core/exception/entity-validation.error';
import { UseCase } from '../../../../../../../libs/common/src/core/usecase';
import { UnitOfWork } from '../../../../../../../libs/common/src/core/db/unit-of-work';

export type CustomerOutputDto = Either<Customer>;

export class CreateCustomerUseCase
  implements UseCase<CreateCustomerDto, CustomerOutputDto>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<CustomerOutputDto> {
    const customer = new CustomerBuild(dto).build();

    if (customer.notification.hasErrors()) {
      const error = new EntityValidationError(customer.notification.toArray());
      return Either.fail(error);
    }

    const customerFromDb = await this.customerRepository.findByEmail(dto.email);
    if (customerFromDb) {
      return Either.fail(new CustomerAlreadyExistException());
    }

    await this.uow.do(async () => {
      return this.customerRepository.insert(customer);
    });

    return Either.ok(customer);
  }
}

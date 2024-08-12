import { ApplicationService } from '../../../../../../libs/common/src/core/application/application.service';
import { UseCase } from '../../../../../../libs/common/src/core/usecase/usecase';
import { EntityValidationException } from '../../../../../../libs/common/src/core/exception/entity-validation.exception';
import { Either } from '../../../../../../libs/common/src/core/types/either';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from '../../../domain/entity/customer';
import { CustomerRepository } from '../../../domain/repository/customer.repository';
import { CustomerBuilder } from '../../../domain/builder/customer.builder';
import { CustomerAlreadyExistException } from '../../../domain/exception/customer-already-exist.exception';

export type CustomerOutputDto = Either<Customer>;

export class CreateCustomerUseCase
  implements UseCase<CreateCustomerDto, CustomerOutputDto>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<CustomerOutputDto> {
    let customer = new CustomerBuilder(dto).withBalance(dto.balance).build();

    if (customer.notification.hasErrors()) {
      const error = new EntityValidationException(
        customer.notification.toJSON(),
      );
      return Either.fail(error);
    }

    const customerFromDb = await this.customerRepository.findByEmail(dto.email);
    if (customerFromDb) {
      return Either.fail(new CustomerAlreadyExistException());
    }

    await this.applicationService.run(async () => {
      return this.customerRepository.insert(customer);
    });

    return Either.ok(customer);
  }
}

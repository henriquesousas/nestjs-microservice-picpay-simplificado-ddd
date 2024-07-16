import { Either } from '../../../../../../libs/common/src/core/types/either';
import { UseCase } from '../../../../../../libs/common/src/core/usecase/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';
import { Customer } from '../../../domain/entity/customer';
import { CustomerNotFoundException } from '../../../domain/exception/customer-not-found.exception';

export class GetCustomerByIdUseCase
  implements UseCase<string, Either<Customer>>
{
  constructor(private readonly repository: CustomerRepository) {}

  async execute(customerId: string): Promise<Either<Customer>> {
    const customer = await this.repository.findById(customerId);
    return !customer
      ? Either.fail(new CustomerNotFoundException())
      : Either.ok(customer);
  }
}

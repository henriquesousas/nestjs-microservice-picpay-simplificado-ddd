import { Either } from '../../../../../../libs/common/src/core/types/either';
import { UseCase } from '../../../../../../libs/common/src/core/application/usecase/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';
import { CustomerNotFoundException } from '../../../domain/exception/customer-not-found.exception';
import {
  CustomerOutput,
  CustomerOutputMapper,
} from '../customer-output.mapper';

export class GetCustomerByIdUseCase
  implements UseCase<string, Either<CustomerOutput>>
{
  constructor(private readonly repository: CustomerRepository) {}

  async execute(customerId: string): Promise<Either<CustomerOutput>> {
    const customer = await this.repository.findById(customerId);
    return !customer
      ? Either.fail(new CustomerNotFoundException())
      : Either.ok(CustomerOutputMapper.toOutput(customer));
  }
}

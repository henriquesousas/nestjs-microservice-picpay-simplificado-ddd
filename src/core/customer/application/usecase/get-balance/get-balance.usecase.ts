import { Either } from '../../../../../../libs/common/src/core/types/either';
import { UseCase } from '../../../../../../libs/common/src/core/usecase/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';
import { Wallet } from '../../../domain/entity/wallet';
import { CustomerNotFoundException } from '../../../domain/exception/customer-not-found.exception';

export class GetBalanceUseCase implements UseCase<string, Either<Wallet>> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(customerId: string): Promise<Either<Wallet>> {
    const customer = await this.repository.findById(customerId);
    return !customer
      ? Either.fail(new CustomerNotFoundException())
      : Either.ok(customer.props.wallet!);
  }
}

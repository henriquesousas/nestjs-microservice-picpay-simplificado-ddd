import { Either } from '../../../../../../libs/common/src/core/types/either';
import { UseCase } from '../../../../../../libs/common/src/core/application/usecase/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';
import { Wallet } from '../../../domain/entity/wallet';
import { CustomerNotFoundException } from '../../../domain/exception/customer-not-found.exception';
import { WalleteOutput, WalleteOutputMapper } from '../customer-output.mapper';

export class GetBalanceUseCase
  implements UseCase<string, Either<WalleteOutput>>
{
  constructor(private readonly repository: CustomerRepository) {}

  async execute(customerId: string): Promise<Either<WalleteOutput>> {
    const customer = await this.repository.findById(customerId);
    return !customer
      ? Either.fail(new CustomerNotFoundException())
      : Either.ok(WalleteOutputMapper.toOutput(customer.props.wallet!));
  }
}

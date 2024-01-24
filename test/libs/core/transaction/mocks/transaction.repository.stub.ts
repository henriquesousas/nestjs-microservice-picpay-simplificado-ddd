import { TransactionReposytory } from '../../../../../libs/core/src/feature/transaction/transaction.repository';
import { UserModel } from '../../../../../libs/core/src/feature/user/models/user.model';

export class TransactionRepositoryStub implements TransactionReposytory {
  async transfer(
    sender: UserModel,
    receiver: UserModel,
    value: number,
  ): Promise<void> {
    return Promise.resolve();
  }
}

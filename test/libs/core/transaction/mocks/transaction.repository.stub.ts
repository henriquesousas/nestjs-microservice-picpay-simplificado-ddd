import { TransactionReposytory } from '../../../../../src/transaction/repositories/interfaces/transaction.repository';
import { UserModel } from '../../../../../src/user/domain/models/user.model';

export class TransactionRepositoryStub implements TransactionReposytory {
  async transfer(
    sender: UserModel,
    receiver: UserModel,
    value: number,
  ): Promise<void> {
    return Promise.resolve();
  }
}

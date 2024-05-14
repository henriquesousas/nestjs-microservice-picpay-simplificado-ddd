import { TransactionReposytory } from '../../../../../src/transaction/domain/repository/TransactionRepository';
import { CustomerEntity } from '../../../../../src/customer/infrastructure/db/typeorm/CustomerEntity';

export class TransactionRepositoryStub implements TransactionReposytory {
  async transfer(
    sender: CustomerEntity,
    receiver: CustomerEntity,
    value: number,
  ): Promise<void> {
    return Promise.resolve();
  }
}

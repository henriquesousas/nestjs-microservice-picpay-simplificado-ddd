import { CustomerEntity } from '../../../customer/infrastructure/db/typeorm/CustomerEntity';

export const TRANSACTION_REPOSITORY_TOKEN = 'TransactionReposytory';

export interface TransactionReposytory {
  transfer(
    sender: CustomerEntity,
    receiver: CustomerEntity,
    value: number,
  ): Promise<void>;
}

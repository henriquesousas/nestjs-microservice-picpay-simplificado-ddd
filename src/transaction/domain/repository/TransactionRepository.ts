import { Customer } from '../../../customer/domain/model/Customer';

export const TRANSACTION_REPOSITORY_TOKEN = 'TransactionReposytory';

export interface TransactionReposytory {
  transfer(sender: Customer, receiver: Customer, amount: number): Promise<void>;
}

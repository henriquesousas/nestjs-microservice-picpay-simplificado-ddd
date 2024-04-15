import { UserModel } from '../../../user/domain/models/user.model';

export const TRANSACTION_REPOSITORY_TOKEN = 'TransactionReposytory';

export interface TransactionReposytory {
  transfer(
    sender: UserModel,
    receiver: UserModel,
    value: number,
  ): Promise<void>;
}

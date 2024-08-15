import { CustomerId } from '../entity/customer';
import { Wallet } from '../entity/wallet';

export type UpdateWalletDto = {
  wallet: Wallet;
  customerId: CustomerId;
};

export interface WalletRepository {
  save(data: UpdateWalletDto[]): Promise<void>;
  findByIds(ids: CustomerId[]): Promise<Wallet[]>;
}

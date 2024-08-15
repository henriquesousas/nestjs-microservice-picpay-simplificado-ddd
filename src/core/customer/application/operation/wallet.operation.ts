import { Wallet } from '../../domain/entity/wallet';
import { UpdateWalletDto } from '../../domain/repository/wallet.repository';

export interface WalletOperation {
  execute(sender: Wallet, balance: number): UpdateWalletDto[];
}

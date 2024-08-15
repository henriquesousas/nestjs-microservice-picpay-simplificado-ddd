import { Wallet } from '../../domain/entity/wallet';
import { UpdateWalletDto } from '../../domain/repository/wallet.repository';
import { WalletOperation } from './wallet.operation';

export class DebitOperation implements WalletOperation {
  execute(sender: Wallet, balance: number): UpdateWalletDto[] {
    sender.debit(balance);
    return [
      {
        wallet: sender,
        customerId: sender.getCustomer()!,
      },
    ];
  }
}

import { Wallet } from '../../domain/entity/wallet';
import { UpdateWalletDto } from '../../domain/repository/wallet.repository';
import { WalletOperation } from './wallet.operation';

export class TransferenceOperation implements WalletOperation {
  constructor(private readonly receiver: Wallet) {}

  execute(sender: Wallet, balance: number): UpdateWalletDto[] {
    sender.transference(this.receiver, balance);
    return [
      {
        wallet: sender,
        customerId: sender.getCustomer()!,
      },
      {
        wallet: this.receiver,
        customerId: this.receiver.getCustomer()!,
      },
    ];
  }
}

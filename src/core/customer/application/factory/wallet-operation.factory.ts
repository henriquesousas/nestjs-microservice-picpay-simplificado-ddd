import { Wallet } from '../../domain/entity/wallet';
import { CreditOperation } from '../operation/credit.operation';
import { DebitOperation } from '../operation/debit.operation';
import { TransferenceOperation } from '../operation/transference.operation';
import { WalletOperation } from '../operation/wallet.operation';

export class WalletOperationFactory {
  static create(type: string, receiver?: Wallet): WalletOperation {
    switch (type) {
      case 'CREDIT':
        return new CreditOperation();
      case 'DEBIT':
        return new DebitOperation();
      case 'TRANSFERENCE':
      case 'PIX':
        if (!receiver) {
          throw new Error('Receiver invalid');
        }
        return new TransferenceOperation(receiver);
      default:
        throw new Error('Invalid operation');
    }
  }
}

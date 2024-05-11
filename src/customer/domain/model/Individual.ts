import { DocumentType } from '../enum/DocumentType';
import { InsuficientBalanceException } from '../exception/InsuficientBalanceException';
import { Transfer } from '../interface/Transfer';
import { Customer } from './Customer';

export class Individual extends Customer implements Transfer {
  documentType = DocumentType.CPF;

  transfer(amount: number, receiver: Customer): void {
    const from = this.getWallet();
    const to = receiver.getWallet();
    if (from.getBalance() < amount) {
      throw new InsuficientBalanceException();
    }
    from.debit(amount);
    to.credit(amount);
  }
}

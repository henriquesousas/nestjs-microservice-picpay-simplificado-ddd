import { DocumentType } from '../../../customer/domain/enum/DocumentType';
import { Document } from '../../../@shared/interfaces/Document';
import { InsuficientBalanceException } from '../../../transaction/domain/exception/InsuficientBalanceException';
import { TransactionNotAllowed } from '../../../transaction/domain/exception/TransactionNotAllowedException';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';
import { Wallet } from '../value-object/Wallet';

export abstract class Customer {
  abstract documentType: DocumentType;
  protected abstract canTransfer: boolean;

  constructor(
    readonly firstName: string,
    readonly surName: string,
    readonly email: Email,
    readonly password: Password,
    readonly document: Document,
    readonly wallet = new Wallet(),
    readonly id?: string,
  ) {}

  credit(amount: number): void {
    if (this.wallet) this.wallet.credit(amount);
  }

  debit(amount: number): void {
    if (this.wallet) this.wallet.debit(amount);
  }

  transfer(to: Customer, amount: number): void {
    if (!this.canTransfer) {
      throw new TransactionNotAllowed();
    }
    if (this.wallet.getBalance() < amount) {
      throw new InsuficientBalanceException();
    }
    this.debit(amount);
    to.credit(amount);
  }
}

import { from } from 'rxjs';
import { DocumentType } from '../../../customer/domain/enum/DocumentType';
import { Document } from '../../../customer/domain/interface/Document';
import { PaymentNotAllowedException } from '../../../transaction/domain/exceptions/payment-not-allowed.exception';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';
import { Wallet } from '../value-object/Wallet';
import { InsuficientBalanceException } from '../exception/InsuficientBalanceException';

export abstract class Customer {
  abstract documentType: DocumentType;
  abstract canTransfer: boolean;

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

  transfer(amount: number, to: Customer): void {
    if (!this.canTransfer) {
      throw new PaymentNotAllowedException();
    }
    if (this.wallet.getBalance() < amount) {
      throw new InsuficientBalanceException();
    }
    this.debit(amount);
    to.credit(amount);
  }
}

import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { ValueObject } from '../../../../../libs/common/src/core/domain/value-object/value-object';

export class Customer extends ValueObject {
  constructor(
    private readonly customer_id: Uuid,
    private readonly canMakeTransference: boolean,
    private readonly name,
    private balance: number,
  ) {
    super();
  }

  getBalance(): number {
    return this.balance;
  }

  credit(amount: number) {
    this.balance += Number(amount);
  }

  debit(amount: number) {
    if (this.balance < amount) {
      this.notification.addError('Saldo insuficiente');
      return;
    }
    this.balance -= Number(amount);
  }

  transference(receiver: Customer, amount: number) {
    if (!this.canMakeTransference) {
      this.notification.addError('Transação não autorizada');
      return;
    }
    this.debit(amount);

    if (!this.notification.hasErrors()) {
      receiver.credit(amount);
    }
  }
}

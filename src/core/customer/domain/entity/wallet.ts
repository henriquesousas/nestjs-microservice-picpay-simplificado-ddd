import { AggregateRoot } from '../../../../../libs/common/src/core/entity/aggregate_root';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { WalletValidator } from '../../application/validator/wallet.validator';
import { CustomerId } from './customer';

export class WalletId extends Uuid {}

export type WalletProps = {
  walletId?: WalletId;
  customerId?: CustomerId;
  balance?: number;
};

export class Wallet extends AggregateRoot {
  constructor(private props: WalletProps = {}) {
    super();
    this.props = {
      walletId: props.walletId ?? new WalletId(),
      balance: props.balance ?? 0,
      customerId: props.customerId,
    };

    this.validate(['balance']);
  }

  getUUid(): Uuid {
    return this.props.walletId!;
  }

  getCustomer(): CustomerId | null {
    return this.props.customerId ?? null;
  }

  get balance(): number {
    return this.props.balance!;
  }

  credit(amount: number): void {
    this.props.balance = Number(this.balance) + Number(amount);
  }

  debit(amount: number): void {
    this.props.balance! -= Number(amount);
  }

  transference(receiver: Wallet, amount: number) {
    if (this.balance >= amount) {
      this.debit(amount);
      receiver.credit(amount);
    }
  }

  private validate(fields: string[]): boolean {
    const validator = new WalletValidator();
    return validator.validate(this.notification, this, fields);
  }
}

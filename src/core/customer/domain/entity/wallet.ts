import { AggregateRoot } from '../../../../../libs/common/src/core/entity/aggregate_root';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { WalletValidator } from '../validator/wallet.validator';

export class WalletId extends Uuid {}

export type WalletProps = {
  walletId?: WalletId;
  balance?: number;
};

export class Wallet extends AggregateRoot {
  constructor(private props: WalletProps = {}) {
    super();
    this.props = {
      walletId: props.walletId ?? new WalletId(),
      balance: props.balance ?? 0,
    };

    this.validate(['balance']);
  }

  getUUid(): Uuid {
    return this.props.walletId!;
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

  private validate(fields: string[]): boolean {
    const validator = new WalletValidator();
    return validator.validate(this.notification, this, fields);
  }
}

import { Entity } from '../../../@shared/entity';
import { Uuid } from '../../../@shared/value-object/uuid';

export class WalletId extends Uuid {}

export type WalletProps = {
  walletId?: WalletId;
  balance?: number;
};

export class Wallet extends Entity {
  constructor(private props: WalletProps = {}) {
    super();
    this.props = {
      ...props,
      walletId: props.walletId ?? new WalletId(),
      balance: props.balance ?? 0,
    };
  }

  get entityId(): Uuid {
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
}

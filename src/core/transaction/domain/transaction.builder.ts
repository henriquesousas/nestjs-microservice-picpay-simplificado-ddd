import { Customer } from './entity/customer';
import {
  CustomerId,
  Transaction,
  TransactionId,
  TransactionType,
} from './entity/transaction';

export type TransactionBuilderConstructorProps = {
  transaction_id: TransactionId;
  type: TransactionType;
  sender: CustomerId;
  amount: number;
  receiver?: CustomerId;
};

export class TransactionBuilder {
  constructor(private props: TransactionBuilderConstructorProps) {}

  withReceiver(receiver?: CustomerId): TransactionBuilder {
    if (receiver) {
      this.props.receiver = receiver;
    }

    return this;
  }

  build(): Transaction {
    const { transaction_id, type, amount, sender, receiver } = this.props;
    return new Transaction({
      transaction_id,
      type,
      sender,
      receiver,
      amount,
    });
  }
}

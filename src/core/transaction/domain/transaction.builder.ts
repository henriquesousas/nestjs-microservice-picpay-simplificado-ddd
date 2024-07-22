import { Customer } from './entity/customer';
import {
  Transaction,
  TransactionId,
  TransactionType,
} from './entity/transaction';

export type TransactionBuilderConstructorProps = {
  transaction_id: TransactionId;
  type: TransactionType;
  sender: Customer;
  receiver?: Customer;
};

export class TransactionBuilder {
  constructor(private props: TransactionBuilderConstructorProps) {}

  withReceiver(receiver: Customer): TransactionBuilder {
    this.props.receiver = receiver;
    return this;
  }

  build(): Transaction {
    const { transaction_id, type, sender } = this.props;
    return new Transaction({
      transaction_id,
      sender,
      type,
    });
  }
}

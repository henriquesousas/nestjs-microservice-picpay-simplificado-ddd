import { AggregateRoot } from '../../../../../libs/common/src/core/domain/entity/aggregate_root';
import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { DidCreditOrDebitEvent } from '../event/did-credit-or-debit.event';
import { DidTransferenceEvent } from '../event/did-transference.event';
import { TransactionCreatedEvent } from '../event/transaction-cretated.event';
import { Customer } from './customer';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFERENCE = 'TRANSFERENCE',
}

//   getStatusFromString(type: string): void {
// //   if (Object.values(Color).includes(colorString as TransactionType)) {
// //     return colorString as TransactionType;
// //   }

// // return undefined;
// }

export class TransactionId extends Uuid {}

export class CustomerId extends Uuid {
  constructor(id?: string) {
    super(id);
  }
}

export type TransactionConstructorProps = {
  readonly sender: CustomerId;
  readonly transaction_id?: TransactionId;
  readonly occurred_on?: Date;
  amount?: number;
  receiver?: CustomerId;
  type?: TransactionType;
};

export class Transaction extends AggregateRoot {
  constructor(public props: TransactionConstructorProps) {
    super();
    this.props = {
      ...props,
      transaction_id: props.transaction_id ?? new TransactionId(),
      occurred_on: props.occurred_on ?? new Date(),
    };

    this.registerDomainEventHandlers();
  }

  getUUid(): Uuid {
    return this.props.transaction_id!;
  }

  debit(customer: Customer, value: number) {
    if (value > customer.getBalance()) {
      this.notification.addError('Saldo insuficiente');
      return;
    }
    this.props.amount = value;
    this.applyEvent(new DidCreditOrDebitEvent(TransactionType.DEBIT));
  }

  credit(value: number) {
    this.props.amount = value;
    this.applyEvent(new DidCreditOrDebitEvent(TransactionType.CREDIT));
  }

  transference(sender: Customer, receiver: Customer, value: number): void {
    if (!sender.getCanMakeTransference()) {
      this.notification.addError('Transação não autorizada');
      return;
    }

    this.debit(sender, value);
    if (!this.notification.hasErrors()) {
      this.applyEvent(new DidTransferenceEvent(receiver.getId(), value));
    }
  }

  private registerDomainEventHandlers(): void {
    this.registerHandler(
      TransactionCreatedEvent.name,
      this.onTransactionCreatedHandle.bind(this),
    );

    this.registerHandler(
      DidTransferenceEvent.name,
      this.onDidTransferenceTransactionEventHandler.bind(this),
    );

    this.registerHandler(
      DidCreditOrDebitEvent.name,
      this.onDidCreditOrDebitTransactionEventHandler.bind(this),
    );
  }

  private onDidTransferenceTransactionEventHandler(
    event: DidTransferenceEvent,
  ) {
    this.props.type = TransactionType.TRANSFERENCE;
    this.props.amount = event.value;
    this.props.receiver = new Uuid(event.receiver);
  }

  private onDidCreditOrDebitTransactionEventHandler(
    event: DidCreditOrDebitEvent,
  ) {
    this.props.type = event.type;
  }

  private onTransactionCreatedHandle() {
    // if (this.sender.notification.hasErrors()) {
    //   this.notification.copyErrors(this.sender.notification);
    // }
    // if (this.type === TransactionType.TRANSFERENCE && !this.receiver) {
    //   this.notification.addError(
    //     'Precisa informar para quem é a transfêrencia',
    //   );
    // }
  }
}

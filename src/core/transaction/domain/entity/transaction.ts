import { AggregateRoot } from '../../../../../libs/common/src/core/domain/entity/aggregate_root';
import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { TransactionCreatedEvent } from '../event/transaction-created.event';
import { Customer } from './customer';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFERENCE = 'TRANSFERENCE',
}

export class TransactionId extends Uuid {}

export class CustomerId extends Uuid {
  constructor(id?: string) {
    super(id);
  }
}

export type TransactionConstructorProps = {
  sender: CustomerId;
  transaction_id?: TransactionId;
  occurred_on?: Date;
  amount?: number;
  receiver?: CustomerId | null;
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

  debit(customer: Customer, amount: number) {
    this.validateBalance(customer, amount);

    if (!this.notification.hasErrors()) {
      this.applyEvent(
        new TransactionCreatedEvent(
          this.getUUid().id,
          this.props.occurred_on!,
          amount,
          TransactionType.DEBIT,
          customer.getId(),
        ),
      );
    }
  }

  credit(amount: number) {
    this.applyEvent(
      new TransactionCreatedEvent(
        this.getUUid().id,
        this.props.occurred_on!,
        amount,
        TransactionType.CREDIT,
        this.props.sender.id,
      ),
    );
  }

  transference(sender: Customer, receiver: Customer, amount: number): void {
    if (!sender.getCanMakeTransference()) {
      this.notification.addError('Transação não autorizada');
      return;
    }

    this.validateBalance(sender, amount);

    if (!this.notification.hasErrors()) {
      this.applyEvent(
        new TransactionCreatedEvent(
          this.getUUid().id,
          this.props.occurred_on!,
          amount,
          TransactionType.TRANSFERENCE,
          this.props.sender.id,
          receiver.getId(),
        ),
      );
    }
  }

  private validateBalance(customer: Customer, amount: number): boolean {
    if (amount > customer.getBalance()) {
      this.notification.addError('Saldo insuficiente');
      return false;
    }

    return true;
  }

  private registerDomainEventHandlers(): void {
    this.registerHandler(
      TransactionCreatedEvent.name,
      this.onTransactionEventHandler.bind(this),
    );
  }

  private onTransactionEventHandler(event: TransactionCreatedEvent) {
    this.props.amount = event.amount;
    this.props.type = event.type;
    this.props.sender = new CustomerId(event.sender);
    this.props.receiver = !event.receiver
      ? null
      : new CustomerId(event.receiver);
  }
}

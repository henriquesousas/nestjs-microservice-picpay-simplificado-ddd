import { AggregateRoot } from '../../../../../libs/common/src/core/domain/entity/aggregate_root';
import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { TransactionCreatedEvent } from '../event/transaction-cretated.event';
import { Customer } from './customer';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFERENCE = 'TRANSFERENCE',
}

export class TransactionId extends Uuid {}

export class CustomerId extends Uuid {}

export type TransactionConstructorProps = {
  transaction_id: TransactionId;
  type: TransactionType;
  amount: number;
  sender: CustomerId;
  receiver?: CustomerId;
  occurred_on?: Date;
};

export class Transaction extends AggregateRoot {
  constructor(readonly props: TransactionConstructorProps) {
    super();

    this.props = {
      ...props,
      occurred_on: props.occurred_on ?? new Date(),
    };

    this.registerDomainEventHandlers();
    this.applyEvent(new TransactionCreatedEvent());
  }

  getUUid(): Uuid {
    return this.props.transaction_id;
  }

  private registerDomainEventHandlers(): void {
    this.registerHandler(
      TransactionCreatedEvent.name,
      this.onTransactionCreatedHandle.bind(this),
    );
  }

  private onTransactionCreatedHandle() {
    if (this.props.sender.notification.hasErrors()) {
      this.notification.copyErrors(this.props.sender.notification);
    }

    if (
      this.props.type === TransactionType.TRANSFERENCE &&
      !this.props.receiver
    ) {
      this.notification.addError(
        'Precisa informar para quem é a transfêrencia',
      );
    }
  }
}

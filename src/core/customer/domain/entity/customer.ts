import { AggregateRoot } from '../../../../../libs/common/src/core/entity/aggregate_root';
import { Document } from '../../../../../libs/common/src/core/document';
import { Uuid } from '../../../../../libs/common/src/core/value-object/uuid';
import { CustomerValidator } from '../validator/customer.validator';
import { InsuficientBalanceException } from '../exception/insuficient-balance.exception';
import { TrasferenceNotAllowed } from '../exception/transference-not-allowed.exception';
import { Email } from '../value-object/email';
import { Name } from '../value-object/name';
import { Password } from '../value-object/password';
import { Wallet } from './wallet';
import { NameUpdatedEvent } from '../events/name-updated.event';
import { CustomerCreatedEvent } from '../events/customer-created.event';

export class CustomerId extends Uuid {}

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export type CustomerConstructorProps = {
  readonly customerId?: CustomerId;
  readonly name: Name;
  readonly email: Email;
  readonly password: Password;
  readonly document: Document;
  readonly wallet?: Wallet;
  isActive?: boolean;
  createdAt?: Date;
};

export abstract class Customer extends AggregateRoot {
  protected abstract documentType: DocumentType;
  protected abstract canTransfer: boolean;

  constructor(public props: CustomerConstructorProps) {
    super();
    this.props = {
      ...props,
      customerId: props.customerId ?? new CustomerId(),
      wallet: props.wallet ?? new Wallet(),
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    };

    this.registerDomainEventHandlers();

    this.applyEvent(
      new CustomerCreatedEvent(
        [this.props.name, this.props.email, this.props.password],
        [this.props.wallet!],
      ),
    );
  }

  get entityId(): Uuid {
    return this.props.customerId!;
  }

  changeFirstName(name: string): void {
    this.props.name.changeName(name);
    this.applyEvent(new NameUpdatedEvent());
  }

  changeSurName(surName: string): void {
    this.props.name.changeSurName(surName);
    this.applyEvent(new NameUpdatedEvent());
  }

  active() {
    this.props.isActive = true;
  }

  deactive() {
    this.props.isActive = false;
  }

  transfer(receiver: Customer, value: number): void {
    if (!this.canTransfer) {
      throw new TrasferenceNotAllowed();
    }
    if (this.props.wallet!.balance < value) {
      throw new InsuficientBalanceException();
    }
    this.props.wallet!.debit(value);
    receiver.props.wallet!.credit(value);
  }

  private registerDomainEventHandlers() {
    this.registerHandler(
      NameUpdatedEvent.name,
      this.onNameUpdatedEvent.bind(this),
    );

    this.registerHandler(
      CustomerCreatedEvent.name,
      this.onCustomerCreatedEvent.bind(this),
    );
  }

  private onNameUpdatedEvent(event: NameUpdatedEvent) {
    if (this.props.name.notification.hasErrors())
      this.notification.copyErrors(this.props.name.notification);
  }

  private onCustomerCreatedEvent(event: CustomerCreatedEvent) {
    for (const vo of event.valueObjects) {
      if (vo.notification.hasErrors())
        this.notification.copyErrors(vo.notification);
    }

    for (const entity of event.entities) {
      if (entity.notification.hasErrors())
        this.notification.copyErrors(entity.notification);
    }
  }

  private validate(fields: string[]): boolean {
    const validator = new CustomerValidator();
    return validator.validate(this.notification, this, fields);
  }
}

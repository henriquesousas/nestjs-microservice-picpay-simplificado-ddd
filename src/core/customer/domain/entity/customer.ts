import { Email } from '../value-object/email';
import { Name } from '../value-object/name';
import { Password } from '../value-object/password';
import { Wallet } from './wallet';
import { NameUpdatedEvent } from '../events/name-updated.event';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { Document } from '../document';
import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { AggregateRoot } from '../../../../../libs/common/src/core/domain/entity/aggregate_root';

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

    this.applyEvent(new CustomerCreatedEvent(this));
  }

  getUUid(): Uuid {
    return this.props.customerId!;
  }

  canMakeTransfer(): boolean {
    return this.canTransfer;
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
    if (this.props.name.notification.hasErrors()) {
      this.notification.copyErrors(this.props.name.notification);
    }
  }

  private onCustomerCreatedEvent(event: CustomerCreatedEvent) {
    if (this.props.name.notification.hasErrors()) {
      this.notification.copyErrors(this.props.name.notification);
    }
    if (this.props.email.notification.hasErrors()) {
      this.notification.copyErrors(this.props.email.notification);
    }
    if (this.props.password.notification.hasErrors()) {
      this.notification.copyErrors(this.props.password.notification);
    }
    if (this.props.wallet!.notification.hasErrors()) {
      this.notification.copyErrors(this.props.wallet!.notification);
    }
  }

  // transfer(receiver: Customer, value: number): void {
  //   if (!this.canTransfer) {
  //     throw new TrasferenceNotAllowed();
  //   }
  //   if (this.props.wallet!.balance < value) {
  //     throw new InsuficientBalanceException();
  //   }
  //   this.props.wallet!.debit(value);
  //   receiver.props.wallet!.credit(value);
  // }

  // private validate(fields: string[]): boolean {
  //   const validator = new CustomerValidator();
  //   return validator.validate(this.notification, this, fields);
  // }
}

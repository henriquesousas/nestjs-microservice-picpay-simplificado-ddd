import { DocumentType } from '../document';
import {
  Customer,
  CustomerConstructorProps,
  CustomerId,
} from '../entity/customer';
import { CustomerCorporate } from '../entity/customer-corporate';
import { CustomerRegular } from '../entity/customer-regular';
import { Wallet } from '../entity/wallet';
import { DocumentFactory } from '../factory/document.factory';
import { Email } from '../value-object/email';
import { Name } from '../value-object/name';
import { Password } from '../value-object/password';

export type customerBuildProps = {
  firstName: string;
  surName: string;
  email: string;
  password: string;
  document: string;
  documentType: DocumentType;
  wallet?: Wallet;
  isActive?: boolean;
  createdAt?: Date;
  customerId?: CustomerId;
};

export class CustomerBuilder {
  constructor(readonly props: customerBuildProps) {}

  withCustomerId(customerId: CustomerId): CustomerBuilder {
    this.props.customerId = customerId;
    return this;
  }

  withBalance(balance: number): CustomerBuilder {
    this.props.wallet = new Wallet({
      balance,
    });
    return this;
  }

  withWallet(wallet: Wallet): CustomerBuilder {
    this.props.wallet = wallet;
    return this;
  }

  withIsActive(active: boolean): CustomerBuilder {
    this.props.isActive = active;
    return this;
  }

  withCreatedAt(date: Date): CustomerBuilder {
    this.props.createdAt = date;
    return this;
  }

  build(): Customer {
    const name = Name.create({
      firstName: this.props.firstName,
      surName: this.props.surName,
    });
    const email = new Email(this.props.email);
    const password = new Password(this.props.password);
    const document = DocumentFactory.create(
      this.props.documentType,
      this.props.document,
    );

    const props: CustomerConstructorProps = {
      name,
      email,
      password,
      document,
      customerId: this.props.customerId,
      wallet: this.props.wallet,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
    };

    return this.props.documentType == DocumentType.CPF
      ? new CustomerRegular(props)
      : new CustomerCorporate(props);
  }
}

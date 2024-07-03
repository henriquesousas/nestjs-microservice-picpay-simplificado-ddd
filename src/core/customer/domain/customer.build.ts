import {
  Customer,
  CustomerConstructorProps,
  CustomerId,
  DocumentType,
} from './entity/customer';
import { CustomerCorporate } from './entity/customer-corporate';
import { CustomerRegular } from './entity/customer-regular';
import { Email } from './value-object/email';
import { Password } from './value-object/password';
import { Wallet } from './entity/wallet';
import { DocumentFactory } from '../../../../libs/common/src/core/document';
import { Name } from './value-object/name';

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

export class CustomerBuild {
  constructor(readonly props: customerBuildProps) {}

  withCustomerId(customerId: CustomerId): CustomerBuild {
    this.props.customerId = customerId;
    return this;
  }

  withBalance(amount: number): CustomerBuild {
    this.props.wallet = new Wallet({
      balance: amount,
    });
    return this;
  }

  withWallet(wallet: Wallet): CustomerBuild {
    this.props.wallet = wallet;
    return this;
  }

  withIsActive(active: boolean): CustomerBuild {
    this.props.isActive = active;
    return this;
  }

  withCreatedAt(date: Date): CustomerBuild {
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

    const customerProps: CustomerConstructorProps = {
      customerId: this.props.customerId,
      name,
      email,
      password,
      wallet: this.props.wallet,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      document: DocumentFactory.create(
        this.props.documentType,
        this.props.document,
      ),
    };

    return this.props.documentType == DocumentType.CPF
      ? new CustomerRegular(customerProps)
      : new CustomerCorporate(customerProps);
  }
}

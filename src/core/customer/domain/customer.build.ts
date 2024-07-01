import { DocumentFactory } from '../../@shared/document';
import { Customer, CustomerId, DocumentType } from './entity/customer';
import { CustomerCorporate } from './entity/customer-corporate';
import { CustomerRegular } from './entity/customer-regular';
import { Email } from './value-object/email';
import { Password } from './value-object/password';
import { Wallet } from './entity/wallet';

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
    const props = {
      firstName: this.props.firstName,
      surName: this.props.surName,
      email: new Email(this.props.email),
      password: new Password(this.props.password),
      customerId: this.props.customerId,
      wallet: this.props.wallet,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
    };
    switch (this.props.documentType) {
      case DocumentType.CPF:
        const regularCustomer = new CustomerRegular({
          ...props,
          document: DocumentFactory.create(
            DocumentType.CPF,
            this.props.document,
          ),
        });

        regularCustomer.notification.copyErrors(
          this.props.wallet?.notification!,
        );

        return regularCustomer;
      case DocumentType.CNPJ:
        const corporateCustomer = new CustomerCorporate({
          ...props,
          document: DocumentFactory.create(
            DocumentType.CNPJ,
            this.props.document,
          ),
        });

        corporateCustomer.notification.copyErrors(
          this.props.wallet?.notification!,
        );
        return corporateCustomer;
      default:
        throw Error('Document not supported!!!');
    }
  }
}

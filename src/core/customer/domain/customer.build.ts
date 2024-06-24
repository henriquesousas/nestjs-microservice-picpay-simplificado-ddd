import {
  Customer,
  CustomerId,
  CustomerProps,
  DocumentType,
} from './entity/customer';
import { CustomerCorporate } from './entity/customer-corporate';
import { CustomerRegular } from './entity/customer-regular';
import { Wallet } from './value-object/wallet';

export class CustomerBuild {
  constructor(private props: CustomerProps) {}

  withId(id: string): CustomerBuild {
    this.props.customerId = new CustomerId(id);
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
    switch (this.props.document.documentType) {
      case DocumentType.CPF:
        return new CustomerRegular(this.props);
      case DocumentType.CNPJ:
        return new CustomerCorporate(this.props);
      default:
        throw Error('Document not supported!!!');
    }
  }
}

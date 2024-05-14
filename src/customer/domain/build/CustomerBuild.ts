import { DocumentType } from '../enum/DocumentType';
import { CustomerFactory } from '../factory/CustomerFactory';
import { Customer } from '../model/Customer';
import { Wallet } from '../value-object/Wallet';

export class CustomerBuild {
  constructor(
    readonly firstName: string,
    readonly surName: string,
    readonly email: string,
    readonly password: string,
    readonly document: string,
    readonly documentType: DocumentType,
    private wallet = new Wallet(),
    private id?: string,
  ) {}

  withId(id: string): CustomerBuild {
    this.id = id;
    return this;
  }

  withWallet(wallet: Wallet): CustomerBuild {
    //this.wallet.credit(amount);
    this.wallet = wallet;
    return this;
  }

  build(): Customer {
    return CustomerFactory.create(
      this.firstName,
      this.surName,
      this.email,
      this.password,
      this.document,
      this.documentType,
      this.wallet,
      this.id,
    );
  }
}

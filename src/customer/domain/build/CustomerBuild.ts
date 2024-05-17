import { DocumentType } from '../enum/DocumentType';
import { CorporateCustomer } from '../model/CorporateCustomer';
import { Customer } from '../model/Customer';
import { RegularCustomer } from '../model/RegularCustomer';
import { Cnpj } from '../value-object/Cnpj';
import { Cpf } from '../value-object/Cpf';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';
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
    this.wallet = wallet;
    return this;
  }

  build(): Customer {
    switch (this.documentType) {
      case DocumentType.CPF:
        return new RegularCustomer(
          this.firstName,
          this.surName,
          new Email(this.email),
          new Password(this.password),
          new Cpf(this.document),
          this.wallet,
          this.id,
        );
      case DocumentType.CNPJ:
        return new CorporateCustomer(
          this.firstName,
          this.surName,
          new Email(this.email),
          new Password(this.password),
          new Cnpj(this.document),
          this.wallet,
          this.id,
        );
      default:
        throw Error('Document not supported!!!');
    }
    // return CustomerFactory.create(
    //   this.firstName,
    //   this.surName,
    //   this.email,
    //   this.password,
    //   this.document,
    //   this.documentType,
    //   this.wallet,
    //   this.id,
    // );
  }
}

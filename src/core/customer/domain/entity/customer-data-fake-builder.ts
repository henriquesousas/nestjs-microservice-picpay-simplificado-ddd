import { faker } from '@faker-js/faker';
import { CustomerBuild } from '../customer.build';
import { Cnpj } from '../value-object/cnpj';
import { Cpf } from '../value-object/cpf';
import { Customer, DocumentType } from './customer';
import { Password } from '../value-object/password';
import { Email } from '../value-object/email';
import { Wallet } from '../value-object/wallet';

export class CustomerDataBuilderFake {
  private fakeCustomer: CustomerBuild;

  constructor(type: DocumentType) {
    const doc =
      type === DocumentType.CPF
        ? new Cpf('02346542312')
        : new Cnpj('1234567890123456');

    this.fakeCustomer = new CustomerBuild({
      firstName: faker.internet.userName(),
      surName: faker.internet.domainName(),
      document: doc,
      password: new Password('123456'),
      email: new Email(faker.internet.email()),
    });
  }

  static aCustomer(
    documentType: DocumentType = DocumentType.CPF,
  ): CustomerDataBuilderFake {
    return new CustomerDataBuilderFake(documentType);
  }

  withFirstName(name: string): CustomerDataBuilderFake {
    this.fakeCustomer.withFirstName(name);
    return this;
  }

  withWallet(value: number): CustomerDataBuilderFake {
    this.fakeCustomer.withWallet(
      new Wallet({
        balance: value,
      }),
    );
    return this;
  }

  withIsActive(active: boolean): CustomerDataBuilderFake {
    this.fakeCustomer.withIsActive(active);
    return this;
  }

  build(): Customer {
    return this.fakeCustomer.build();
  }
}

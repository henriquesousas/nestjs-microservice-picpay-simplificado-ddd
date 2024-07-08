import { faker } from '@faker-js/faker';
import { CustomerBuild } from '../customer.build';
import { Customer, DocumentType } from '../entity/customer';

export class CustomerDataBuilderFake {
  private fakeCustomer: CustomerBuild;

  constructor(type: DocumentType) {
    this.fakeCustomer = new CustomerBuild({
      firstName: faker.internet.userName(),
      surName: faker.internet.domainName(),
      document: type === DocumentType.CPF ? '02346542312' : '1234567890123456',
      documentType: type,
      password: '123456',
      email: faker.internet.email(),
    });
  }

  static aCustomer(
    documentType: DocumentType = DocumentType.CPF,
  ): CustomerDataBuilderFake {
    return new CustomerDataBuilderFake(documentType);
  }

  withFirstName(name: string): CustomerDataBuilderFake {
    this.fakeCustomer.props.firstName = name;
    return this;
  }

  withFirstNameInvalid(): CustomerDataBuilderFake {
    this.fakeCustomer.props.firstName = '1';
    return this;
  }

  withSurName(name: string): CustomerDataBuilderFake {
    this.fakeCustomer.props.surName = name;
    return this;
  }

  withEmailInvalid(): CustomerDataBuilderFake {
    this.fakeCustomer.props.email = 'test';
    return this;
  }

  withPasswordInvalid(): CustomerDataBuilderFake {
    this.fakeCustomer.props.password = '1';
    return this;
  }

  withWallet(value: number): CustomerDataBuilderFake {
    this.fakeCustomer.withBalance(value);
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

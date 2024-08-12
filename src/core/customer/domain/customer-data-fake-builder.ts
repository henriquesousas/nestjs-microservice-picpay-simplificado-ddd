import { faker } from '@faker-js/faker';
import { DocumentType } from './document';
import { Customer } from './entity/customer';
import { CustomerBuilder } from './builder/customer.builder';

export class CustomerDataBuilderFake {
  private fakeCustomer: CustomerBuilder;

  constructor(type: DocumentType) {
    this.fakeCustomer = new CustomerBuilder({
      firstName: faker.internet.userName(),
      surName: faker.internet.domainName(),
      document: type === DocumentType.CPF ? '02346542312' : '1234567890123456',
      documentType: type,
      password: '123456',
      email: faker.internet.email(),
    });
  }

  static aCustomerRegular(): CustomerDataBuilderFake {
    return new CustomerDataBuilderFake(DocumentType.CPF);
  }

  static aCustomerCorporate(): CustomerDataBuilderFake {
    return new CustomerDataBuilderFake(DocumentType.CNPJ);
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

  withBalance(value: number): CustomerDataBuilderFake {
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

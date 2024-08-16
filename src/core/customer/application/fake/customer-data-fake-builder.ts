import { faker } from '@faker-js/faker';
import { CustomerBuilder } from '../builder/customer.builder';
import { DocumentType } from '../../domain/document';
import { Customer } from '../../domain/entity/customer';

export class CustomerDataBuilderFake {
  private customerBuilder: CustomerBuilder;

  constructor(type: DocumentType) {
    this.customerBuilder = new CustomerBuilder({
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
    this.customerBuilder.props.firstName = name;
    return this;
  }

  withFirstNameInvalid(): CustomerDataBuilderFake {
    this.customerBuilder.props.firstName = '1';
    return this;
  }

  withSurName(name: string): CustomerDataBuilderFake {
    this.customerBuilder.props.surName = name;
    return this;
  }

  withEmailInvalid(): CustomerDataBuilderFake {
    this.customerBuilder.props.email = 'test';
    return this;
  }

  withPasswordInvalid(): CustomerDataBuilderFake {
    this.customerBuilder.props.password = '1';
    return this;
  }

  withBalance(value: number): CustomerDataBuilderFake {
    this.customerBuilder.withBalance(value);
    return this;
  }

  withIsActive(active: boolean): CustomerDataBuilderFake {
    this.customerBuilder.withIsActive(active);
    return this;
  }

  build(): Customer {
    return this.customerBuilder.build();
  }
}

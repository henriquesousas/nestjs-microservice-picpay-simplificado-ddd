/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomerBuild } from '../../../build/CustomerBuild';
import { DocumentType } from '../../../enum/document-type';
import { Customer } from '../../../model/Customer';
import { CustomerRepository } from '../../../../../core/customer/domain/customer.repository';

export class CustomerRepositoryStub implements CustomerRepository {
  async save(customer: Customer): Promise<void> {
    return Promise.resolve();
  }

  async getByEmailOrDocument(
    email: string,
    document: string,
  ): Promise<Customer | null> {
    return Promise.resolve(
      new CustomerBuild(
        'any',
        'any',
        'email@gmail.com',
        '111111',
        '11111111111',
        DocumentType.CPF,
      ).build(),
    );
  }

  async getById(id: string): Promise<Customer> {
    return new CustomerBuild(
      'any',
      'any',
      'email@gmail.com',
      '111111',
      '11111111111',
      DocumentType.CPF,
    ).build();
  }
}

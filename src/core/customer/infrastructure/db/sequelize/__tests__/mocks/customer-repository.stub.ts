import { SearchParam } from '../../../../../../../../libs/common/src/core/database/search-param';
import { SearchResult } from '../../../../../../../../libs/common/src/core/database/search-result';
import { CustomerRepository } from '../../../../../domain/customer.repository';
import { Customer } from '../../../../../domain/entity/customer';
import { CustomerDataBuilderFake } from '../../../../../domain/customer-data-fake-builder';

export class CustomerRepositoryStub implements CustomerRepository {
  sortableFields: string[] = [];

  async insert(entity: Customer): Promise<void> {
    return Promise.resolve();
  }

  async insertMany(entities: Customer[]): Promise<void> {
    return Promise.resolve();
  }

  update(entity: Customer): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(entityId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findById(entityId: string): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<Customer> {
    return CustomerDataBuilderFake.aCustomer().build();
  }

  search(props: SearchParam<string>): Promise<SearchResult<Customer>> {
    throw new Error('Method not implemented.');
  }
  // async save(customer: Customer): Promise<void> {
  //   return Promise.resolve();
  // }

  // async getByEmailOrDocument(
  //   email: string,
  //   document: string,
  // ): Promise<Customer | null> {
  //   return Promise.resolve(
  //     new CustomerBuild(
  //       'any',
  //       'any',
  //       'email@gmail.com',
  //       '111111',
  //       '11111111111',
  //       DocumentType.CPF,
  //     ).build(),
  //   );
  // }

  // async getById(id: string): Promise<Customer> {
  //   return new CustomerBuild(
  //     'any',
  //     'any',
  //     'email@gmail.com',
  //     '111111',
  //     '11111111111',
  //     DocumentType.CPF,
  //   ).build();
  // }
}

import { SearchParam } from '../../../../../../../../libs/common/src/core/database/search-param';
import { SearchResult } from '../../../../../../../../libs/common/src/core/database/search-result';
import { CustomerDataBuilderFake } from '../../../../../application/fake/customer-data-fake-builder';
import { Customer } from '../../../../../domain/entity/customer';
import { CustomerRepository } from '../../../../../domain/repository/customer.repository';

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

  async findBy(dto: {
    email?: string;
    document?: string;
  }): Promise<Customer | null> {
    return Promise.resolve(CustomerDataBuilderFake.aCustomerRegular().build()!);
  }

  search(props: SearchParam<string>): Promise<SearchResult<Customer>> {
    throw new Error('Method not implemented.');
  }
}

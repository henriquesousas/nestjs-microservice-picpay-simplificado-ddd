import { Customer } from '../../../domain/model/Customer';
import { CustomerRepository } from '../../../domain/repository/CustomerRepository';

export class CustomerRepositoryInMemory implements CustomerRepository {
  private customers: Customer[] = [];

  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async getByEmailOrDocument(
    email: string,
    document: string,
  ): Promise<Customer> {
    return this.customers.find(
      (customer) =>
        customer.getEmail() === email || customer.getDocument() === document,
    );
  }

  async getById(id: string): Promise<Customer> {
    return this.customers.find((customer) => customer.getId() === id);
  }
}

import { Customer } from '../model/Customer';

export const CUSTOMER_REPOSITORY_TOKEN = 'CustomerRepository';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  getByEmailOrDocument(email: string, document: string): Promise<Customer>;
  getById(id: string): Promise<Customer>;
}

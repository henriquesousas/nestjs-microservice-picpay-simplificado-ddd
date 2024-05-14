import { Customer } from '../model/Customer';
import { CustomerRepository } from '../repository/CustomerRepository';

export class GetCustomerByEmailUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(email: string): Promise<Customer> {
    //return await this.customerRepository.getByEmailOrDocument(email);
    throw new Error();
  }
}

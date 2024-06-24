/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '../model/Customer';
import { CustomerRepository } from '../../../core/customer/domain/customer.repository';

export class GetCustomerByEmailUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(email: string): Promise<Customer> {
    //return await this.customerRepository.getByEmailOrDocument(email);
    throw new Error();
  }
}

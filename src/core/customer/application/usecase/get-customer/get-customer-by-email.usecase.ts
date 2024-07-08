import { UseCase } from '../../../../../../../libs/common/src/core/usecase';
import { CustomerRepository } from '../../../../domain/customer.repository';
import { Customer } from '../../../../domain/entity/customer';

export class GetCustomerByEmailUseCase implements UseCase<string, Customer> {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(email: string): Promise<Customer> {
    throw new Error();
  }
}

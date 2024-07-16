import { UseCase } from '../../../../../../libs/common/src/core/usecase/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';

export class GetCustomerByIdUseCase implements UseCase<string, string> {
  constructor(private readonly repository: CustomerRepository) {}
  execute(input: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

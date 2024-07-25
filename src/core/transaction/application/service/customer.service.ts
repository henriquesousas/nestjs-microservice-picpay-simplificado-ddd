import { Either } from '../../../../../libs/common/src/core/types/either';
import { Customer } from '../../domain/entity/customer';

export interface CustomerService {
  findOne(customer_id: string): Promise<Either<Customer>>;
}

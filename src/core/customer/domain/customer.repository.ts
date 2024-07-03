import { Repository } from '../../../../libs/common/src/core/db/repository';
import { SearchRepository } from '@app/common/core/db/search.repository';
import { Customer } from './entity/customer';

export interface CustomerRepository
  extends Repository<Customer>,
    SearchRepository<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}

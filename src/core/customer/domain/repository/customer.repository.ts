import { SearchRepository } from '@app/common/core/database/search.repository';
import { Repository } from '../../../../../libs/common/src/core/database/repository';
import { Customer } from '../entity/customer';

export interface CustomerRepository
  extends Repository<Customer>,
    SearchRepository<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}

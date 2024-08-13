import { SearchRepository } from '@app/common/core/database/search.repository';
import { Repository } from '../../../../../libs/common/src/core/database/repository';
import { Customer } from '../entity/customer';

export interface CustomerRepository
  extends Repository<Customer>,
    SearchRepository<Customer> {
  findBy(dto: { email?: string; document?: string }): Promise<Customer | null>;
}

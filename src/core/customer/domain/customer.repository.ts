import { Repository } from '../../@shared/db/repository';
import { SearchRepository } from '../../@shared/db/search.repository';
import { Customer } from './entity/customer';

export interface CustomerRepository
  extends Repository<Customer>,
    SearchRepository<Customer> {}

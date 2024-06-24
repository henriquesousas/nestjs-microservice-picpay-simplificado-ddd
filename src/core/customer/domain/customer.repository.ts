import { Entity } from '../../@shared/entity';
import { Customer } from './entity/customer';

export const CUSTOMER_REPOSITORY_TOKEN = 'CustomerRepository';

export interface BaseRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  insertMany(entities: E[]): Promise<void>;
  update(entity: E): Promise<boolean>;
  delete(entityId: string): Promise<boolean>;
  findById(entityId: string): Promise<E | null>;
  findAll(): Promise<E[]>;
}

export interface CustomerRepository extends BaseRepository<Customer> {}

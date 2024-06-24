import { Entity } from '../entity';

export interface Repository<E extends Entity> {
  insert(entity: E): Promise<void>;
  insertMany(entities: E[]): Promise<void>;
  update(entity: E): Promise<boolean>;
  delete(entityId: string): Promise<boolean>;
  findById(entityId: string): Promise<E | null>;
  findAll(): Promise<E[]>;
}

import { User } from '../entities/user';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  create(user: User): Promise<void>;
}

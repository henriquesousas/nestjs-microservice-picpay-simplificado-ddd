import { UserModel } from '../entities/user.model';

export const USER_REPOSITORY_TOKEN = 'UserRepository';

export interface UserRepository {
  create(user: UserModel): Promise<UserModel>;
  findByDocumentOrEmail(
    numberDocument: string,
    email: string,
  ): Promise<UserModel>;
}

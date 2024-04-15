import { UserModel } from '../../domain/models/user.model';

export const USER_REPOSITORY_TOKEN = 'UserRepository';

export interface UserRepository {
  create(user: UserModel): Promise<UserModel>;
  findById(userId: string): Promise<UserModel>;
  findByDocumentOrEmail(
    numberDocument: string,
    email: string,
  ): Promise<UserModel>;
}

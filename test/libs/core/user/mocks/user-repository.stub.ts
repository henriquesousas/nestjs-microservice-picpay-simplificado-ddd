/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from '../../../../../libs/core/src/feature/user/models/user.model';
import { UserRepository } from '../../../../../libs/core/src/feature/user/user.repository';
import { userModelMock } from './user-model.mock';

export class UserRepositoryStub implements UserRepository {
  async findById(userId: string): Promise<UserModel> {
    return Promise.resolve(userModelMock);
  }
  async create(user: UserModel): Promise<UserModel> {
    return Promise.resolve(userModelMock);
  }
  async findByDocumentOrEmail(
    firstName: string,
    secondName_: string,
  ): Promise<UserModel> {
    return undefined;
  }
}

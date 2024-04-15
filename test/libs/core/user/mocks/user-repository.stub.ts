/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from '../../../../../src/user/domain/models/user.model';
import { UserRepository } from '../../../../../src/user/repositories/interfaces/user.repository';
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

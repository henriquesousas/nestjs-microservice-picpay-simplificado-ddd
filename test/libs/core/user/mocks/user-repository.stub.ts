/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomerEntity } from '../../../../../src/customer/infrastructure/db/typeorm/CustomerEntity';
import { UserRepository } from '../../../../../src/user/repositories/interfaces/user.repository';
import { userModelMock } from './user-model.mock';

export class UserRepositoryStub implements UserRepository {
  async findById(userId: string): Promise<CustomerEntity> {
    return Promise.resolve(userModelMock);
  }
  async create(user: CustomerEntity): Promise<CustomerEntity> {
    return Promise.resolve(userModelMock);
  }
  async findByDocumentOrEmail(
    firstName: string,
    secondName_: string,
  ): Promise<CustomerEntity> {
    return undefined;
  }
}

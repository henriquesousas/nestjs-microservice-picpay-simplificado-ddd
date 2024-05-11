/* eslint-disable @typescript-eslint/no-unused-vars */
import { Result } from '../../../../libs/core/src/common/types/types';
import { CreateUserDto } from '../../../../src/user/domain/dtos/create-user.dto';
import { CustomerEntity } from '../../../../src/customer/infrastructure/db/typeorm/CustomerEntity';
import { CreateUser } from '../../../../src/user/domain/usecases/interfaces/create-user';
import { userModelMock } from '../../../libs/core/user/mocks/user-model.mock';

export class CreateUserUseCaseStub implements CreateUser {
  async execute(dto: CreateUserDto): Promise<Result<CustomerEntity>> {
    return Promise.resolve(userModelMock);
  }
}

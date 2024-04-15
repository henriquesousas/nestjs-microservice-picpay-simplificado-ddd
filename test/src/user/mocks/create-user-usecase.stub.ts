/* eslint-disable @typescript-eslint/no-unused-vars */
import { Result } from '../../../../libs/core/src/common/types/types';
import { CreateUserDto } from '../../../../src/user/domain/dtos/create-user.dto';
import { UserModel } from '../../../../src/user/domain/models/user.model';
import { CreateUser } from '../../../../src/user/domain/usecases/interfaces/create-user';
import { userModelMock } from '../../../libs/core/user/mocks/user-model.mock';

export class CreateUserUseCaseStub implements CreateUser {
  async execute(dto: CreateUserDto): Promise<Result<UserModel>> {
    return Promise.resolve(userModelMock);
  }
}

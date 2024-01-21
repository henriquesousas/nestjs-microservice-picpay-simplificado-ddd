/* eslint-disable @typescript-eslint/no-unused-vars */
import { Result } from '../../../../libs/core/src/common/types/types';
import { CreateUserDto } from '../../../../libs/core/src/feature/user/dtos/create-user.dto';
import { UserModel } from '../../../../libs/core/src/feature/user/models/user.model';
import { CreateUser } from '../../../../libs/core/src/feature/user/usecases/interfaces/create-user';
import { userModelMock } from '../../../libs/core/user/mocks/user-model.mock';

export class CreateUserUseCaseStub implements CreateUser {
  async execute(dto: CreateUserDto): Promise<Result<UserModel>> {
    return Promise.resolve(userModelMock);
  }
}

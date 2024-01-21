import { Result } from '../../../../common/types/types';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserModel } from '../../models/user.model';

export const CREATE_USER_USECASE_TOKEN = 'CreateUser';

export interface CreateUser {
  execute(dto: CreateUserDto): Promise<Result<UserModel>>;
}

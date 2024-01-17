import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CREATE_USER_USECASE_TOKEN,
  CreateUserUseCase,
} from '@app/core/user/usecases/create-user.usecase';
import { CreateUserDto } from '@app/core/user/dtos/create-user.dto';
import { isError } from '../../libs/core/common/types/types';
import { CreateUserResponse } from './dtos/create-user-response.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USECASE_TOKEN)
    private readonly usecase: CreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<CreateUserResponse> {
    const userOrError = await this.usecase.execute(dto);
    if (isError(userOrError)) {
      throw userOrError;
    }
    const { id, firstName, secondName, email, amount } = userOrError;
    return {
      id,
      firstName,
      secondName,
      email,
      amount,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Result, isError } from '../../../common/types/types';
import { UseCaseWithParam } from '../../../common/usecase/usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user.repository';
import { Document } from '../entities/document';
import { User } from '../entities/user';

@Injectable()
export class CreateUserUseCase
  implements UseCaseWithParam<CreateUserDto, void>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<Result<void>> {
    const documentOrError = Document.create(dto.document, dto.userType);
    if (isError(documentOrError)) {
      return documentOrError;
    }
    const document = documentOrError;
    await this.userRepository.create(new User({ ...dto, document }));
  }
}

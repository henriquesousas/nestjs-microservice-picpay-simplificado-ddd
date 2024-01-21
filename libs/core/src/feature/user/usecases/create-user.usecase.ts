import { Inject, Injectable } from '@nestjs/common';
import { Result, isError } from '@app/core/common/types/types';
import { CreateUserDto } from '@app/core/feature/user/dtos/create-user.dto';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '@app/core/feature/user/user.repository';
import { Document } from '@app/core/feature/user/models/document';
import { DocumentValidator } from '@app/core/common/validator/document.validator';
import { UserModel } from '@app/core/feature/user/models/user.model';
import { UserAlreadyExistException } from '@app/core/feature/user/exceptions/user-already-exist.exception';
import { CreateUser } from '@app/core/feature/user/usecases/interfaces/create-user';

@Injectable()
export class CreateUserUseCase implements CreateUser {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    private readonly validators: DocumentValidator[],
  ) {}

  async execute(dto: CreateUserDto): Promise<Result<UserModel>> {
    const user = await this.userRepository.findByDocumentOrEmail(
      dto.document,
      dto.email,
    );
    if (user) {
      return new UserAlreadyExistException();
    }
    const documentOrError = Document.create(
      dto.document,
      dto.documentType,
      this.validators,
    );
    if (isError(documentOrError)) {
      return documentOrError;
    }
    const document = documentOrError;
    return await this.userRepository.create(
      new UserModel({
        ...dto,
        document: document.getValue,
        documentType: document.getType,
      }),
    );
  }
}

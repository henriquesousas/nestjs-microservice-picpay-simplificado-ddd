import { Inject, Injectable } from '@nestjs/common';
import { Result, isError } from '@app/core/common/types/types';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';

import { DocumentValidator } from '@app/core/common/validator/document.validator';

import { CreateUser } from './interfaces/create-user';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { UserModel } from '../models/user.model';
import { Document } from '../models/document';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../../repositories/interfaces/user.repository';

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

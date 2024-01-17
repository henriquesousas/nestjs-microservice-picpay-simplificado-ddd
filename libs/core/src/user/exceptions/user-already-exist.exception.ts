import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistException extends BadRequestException {
  constructor() {
    super('Usuário já cadastro em nosso sistema');
  }
}

import { NotFoundException } from '@nestjs/common';

export class UserNotfoundException extends NotFoundException {
  constructor() {
    super('Usuário não localizado');
  }
}

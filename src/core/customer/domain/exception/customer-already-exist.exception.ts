import { BadRequestException } from '@nestjs/common';

export class CustomerAlreadyExistException extends BadRequestException {
  constructor() {
    super('Cliente já cadastro em nosso sistema');
  }
}

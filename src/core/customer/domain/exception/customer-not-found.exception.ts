import { NotFoundException } from '@nestjs/common';

export class CustomerNotFoundException extends NotFoundException {
  constructor() {
    super('Cliente não localizado');
  }
}

import { BadRequestException } from '@nestjs/common';

export class TransactionNotAllowed extends BadRequestException {
  constructor() {
    super(`Transação não autorizada`);
  }
}

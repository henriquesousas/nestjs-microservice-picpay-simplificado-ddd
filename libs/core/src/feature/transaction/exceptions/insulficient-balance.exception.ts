import { BadRequestException } from '@nestjs/common';

export class InsulficientBalanceException extends BadRequestException {
  constructor() {
    super(`Saldo insuficiente`);
  }
}

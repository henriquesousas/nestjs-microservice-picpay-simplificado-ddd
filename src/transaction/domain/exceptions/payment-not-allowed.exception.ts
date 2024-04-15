import { BadRequestException } from '@nestjs/common';

export class PaymentNotAllowedException extends BadRequestException {
  constructor() {
    super(`Pagamento não permitido`);
  }
}

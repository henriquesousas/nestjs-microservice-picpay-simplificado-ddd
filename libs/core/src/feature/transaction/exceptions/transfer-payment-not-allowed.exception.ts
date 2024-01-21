import { BadRequestException } from '@nestjs/common';

export class TransferNotAllowedException extends BadRequestException {
  constructor() {
    super(`Pagamento não permitido`);
  }
}

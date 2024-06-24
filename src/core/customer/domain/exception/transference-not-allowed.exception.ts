import { BadRequestException } from '@nestjs/common';

export class TrasferenceNotAllowed extends BadRequestException {
  constructor() {
    super(`Transação não autorizada`);
  }
}

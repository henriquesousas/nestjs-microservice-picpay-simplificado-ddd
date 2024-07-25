import { BadRequestException } from '@nestjs/common';
import { FieldsErrors } from '../../../../../libs/common/src/core/application/validator/validator-field';

export class TrasferenceNotAllowed extends BadRequestException {
  constructor(public error: FieldsErrors[], message = 'TrasferenceNotAllowed') {
    super(`Transação não autorizada`);
    this.name = 'TrasferenceNotAllowed';
  }
}

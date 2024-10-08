import { BadRequestException } from '@nestjs/common';
import { FieldsErrors } from '../validator/validator-field';

export class EntityValidationException extends BadRequestException {
  constructor(public error: FieldsErrors[], message = 'Validation Error') {
    super(error, message);
  }
  count() {
    return Object.keys(this.error).length;
  }
}

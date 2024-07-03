import { BadRequestException } from '@nestjs/common';
import { FieldsErrors } from '../validator/validator-field';

export class EntityValidationError extends BadRequestException {
  constructor(public error: FieldsErrors[], message = 'Validation Error') {
    super(error, message);
  }
}

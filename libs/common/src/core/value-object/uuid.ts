import { InvalidUuidError } from '../exception/invalid-uuid.exception';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';

export class Uuid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validate();
  }

  validate() {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      this.notification.addError('ID deve ser um Uuid válido', 'Id');
    }
  }

  toString() {
    return this.id;
  }
}

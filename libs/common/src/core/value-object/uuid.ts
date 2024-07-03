import { InvalidUuidError } from '../exception/invalid-uuid.error';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid {
  readonly id: string;

  constructor(id?: string) {
    this.id = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString() {
    return this.id;
  }
}

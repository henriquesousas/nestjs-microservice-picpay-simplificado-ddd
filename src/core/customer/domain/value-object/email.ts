import { ValueObject } from '../../../@shared/value-object/value-object';

export class Email extends ValueObject {
  constructor(value: string) {
    super();
    if (!this.validate(value)) {
      throw new Error('Email inválido.');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

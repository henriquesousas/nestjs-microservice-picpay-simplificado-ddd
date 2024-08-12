import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';

export class Email extends ValueObject {
  constructor(private readonly value: string) {
    super();
    this.validate(value);
  }

  getValue(): string {
    return this.value;
  }

  validate(value: string): void {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isEmail) {
      this.notification.addError('Email inválido');
    }
  }
}

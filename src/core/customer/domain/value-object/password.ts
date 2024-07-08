import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';

export class Password extends ValueObject {
  constructor(private readonly value: string) {
    super();
    this.validate();
  }

  getValue(): string {
    return this.value;
  }

  private validate(): void {
    const isValid = this.value.length >= 5 && this.value.length <= 10;
    if (!isValid) {
      this.notification.addError('Senha inválida', 'password');
    }
  }
}

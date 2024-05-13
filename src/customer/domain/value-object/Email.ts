export class Email {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Email inválido.');
    }
    this._value = value;
  }

  private validate(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  getValue(): string {
    return this._value;
  }
}

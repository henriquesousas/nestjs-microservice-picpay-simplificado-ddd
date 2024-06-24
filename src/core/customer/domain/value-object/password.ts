export class Password {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Senha inválida.');
    }
    this._value = value;
  }

  private validate(value: string): boolean {
    return value.length >= 5 && value.length <= 10;
  }

  get value(): string {
    return this._value;
  }
}

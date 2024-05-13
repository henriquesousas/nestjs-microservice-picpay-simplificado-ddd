export class Password {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Senha inválida.');
    }
  }

  private validate(value: string): boolean {
    return true;
  }

  getValue(): string {
    return this._value;
  }
}

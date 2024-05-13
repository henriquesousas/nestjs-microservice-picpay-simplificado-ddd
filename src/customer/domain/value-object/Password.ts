export class Password {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Senha inválida.');
    }
  }

  private validate(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  getValue(): string {
    return this._value;
  }
}

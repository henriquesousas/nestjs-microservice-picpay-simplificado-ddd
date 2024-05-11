import { Document } from '../../../customer/domain/interface/Document';

export class Cpf implements Document {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid CPF');
    }
    this._value = value;
  }

  getValue(): string {
    return this._value;
  }

  private validate(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }
}

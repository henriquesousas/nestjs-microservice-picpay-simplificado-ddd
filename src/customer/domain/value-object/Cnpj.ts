import { Document } from '../../../customer/domain/interface/Document';

export class Cnpj implements Document {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid CNPJ');
    }
    this._value = value;
  }

  getValue(): string {
    return this._value;
  }

  private validate(number: string): boolean {
    return /^\d{16}$/.test(number);
  }
}

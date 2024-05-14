import { Document } from '../../../customer/domain/interface/Document';
import { DocumentType } from '../enum/DocumentType';
import { DocumentInvalidException } from '../exception/DocumentInvalidException';

export class Cnpj implements Document {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CNPJ);
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

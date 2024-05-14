import { Document } from '../../../@shared/interfaces/Document';
import { DocumentType } from '../enum/DocumentType';
import { DocumentInvalidException } from '../exception/DocumentInvalidException';

export class Cpf implements Document {
  private _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CPF);
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

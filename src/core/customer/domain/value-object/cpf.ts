import { Document } from '../../../@shared/document';
import { ValueObject } from '../../../@shared/value-object/value-object';
import { DocumentType } from '../entity/customer';
import { DocumentInvalidException } from '../exception/document-invalid.exception';

export class Cpf extends ValueObject implements Document {
  constructor(value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CPF);
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  get documentType(): DocumentType {
    return DocumentType.CPF;
  }

  validate(value: string): boolean {
    return /^\d{11}$/.test(value);
  }
}

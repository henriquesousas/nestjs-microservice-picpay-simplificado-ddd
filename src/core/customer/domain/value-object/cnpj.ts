import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { DocumentType } from '../entity/customer';
import { Document } from '../../../@shared/document';
import { ValueObject } from '../../../@shared/value-object/value-object';

export class Cnpj extends ValueObject implements Document {
  constructor(value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CNPJ);
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
  get documentType(): DocumentType {
    return DocumentType.CNPJ;
  }

  validate(number: string): boolean {
    return /^\d{16}$/.test(number);
  }
}

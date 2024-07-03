import { Document } from '../../../../../libs/common/src/core/document';
import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';
import { DocumentType } from '../entity/customer';
import { DocumentInvalidException } from '../exception/document-invalid.exception';

export class Cpf extends ValueObject implements Document {
  constructor(value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CPF);
    }
  }

  get value(): string {
    return this.value;
  }

  get documentType(): DocumentType {
    return DocumentType.CPF;
  }

  validate(value: string): boolean {
    return /^\d{11}$/.test(value);
  }
}

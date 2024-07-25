import { ValueObject } from '../../../../../libs/common/src/core/domain/value-object/value-object';
import { Document } from '../document';
import { DocumentType } from '../document-type';
import { DocumentInvalidException } from '../exception/document-invalid.exception';

export class Cpf extends ValueObject implements Document {
  constructor(private value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CPF);
    }
  }

  getValue(): string {
    return this.value;
  }

  getType(): DocumentType {
    return DocumentType.CPF;
  }

  validate(value: string): boolean {
    return /^\d{11}$/.test(value);
  }
}

import { Document } from '../../../../../libs/common/src/core/entity/document';
import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';
import { DocumentType } from '../entity/customer';
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

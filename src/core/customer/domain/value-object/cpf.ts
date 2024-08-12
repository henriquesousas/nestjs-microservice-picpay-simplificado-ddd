import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';
import { Document, DocumentType } from '../document';
import { DocumentInvalidException } from '../exception/document-invalid.exception';

export class Cpf extends ValueObject implements Document {
  constructor(private value: string) {
    super();
    if (!this.validate(value)) {
      this.notification.addError(
        new DocumentInvalidException(DocumentType.CPF).message,
      );
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

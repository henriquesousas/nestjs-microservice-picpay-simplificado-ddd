import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { Document, DocumentType } from '../document';
import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';

export class Cnpj extends ValueObject implements Document {
  constructor(private value: string) {
    super();
    if (!this.validate(value)) {
      this.notification.addError(
        new DocumentInvalidException(DocumentType.CNPJ).message,
      );
    }
  }

  getValue(): string {
    return this.value;
  }

  getType(): DocumentType {
    return DocumentType.CNPJ;
  }

  private validate(number: string): boolean {
    return /^\d{16}$/.test(number);
  }
}

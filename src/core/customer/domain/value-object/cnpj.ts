import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { Document, DocumentType } from '../document';

export class Cnpj extends Document {
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

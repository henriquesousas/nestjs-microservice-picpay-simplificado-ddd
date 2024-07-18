import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { DocumentType } from '../entity/customer';

import { Document } from '../document';
import { ValueObject } from '../../../../../libs/common/src/core/domain/value-object/value-object';

export class Cnpj extends ValueObject implements Document {
  constructor(private value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CNPJ);
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

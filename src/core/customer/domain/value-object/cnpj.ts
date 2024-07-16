import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { DocumentType } from '../entity/customer';

import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';
import { Document } from '../../../../../libs/common/src/core/entity/document';

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

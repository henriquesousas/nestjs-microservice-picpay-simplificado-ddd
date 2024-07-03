import { DocumentInvalidException } from '../exception/document-invalid.exception';
import { DocumentType } from '../entity/customer';

import { ValueObject } from '../../../../../libs/common/src/core/value-object/value-object';
import { Document } from '../../../../../libs/common/src/core/document';

export class Cnpj extends ValueObject implements Document {
  constructor(private value: string) {
    super();
    if (!this.validate(value)) {
      throw new DocumentInvalidException(DocumentType.CNPJ);
    }
  }

  get getValue(): string {
    return this.value;
  }

  get documentType(): DocumentType {
    return DocumentType.CNPJ;
  }

  private validate(number: string): boolean {
    return /^\d{16}$/.test(number);
  }
}

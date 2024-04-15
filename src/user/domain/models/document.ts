import { BadRequestException } from '@nestjs/common';
import { Result } from '../../../../libs/core/src/common/types/types';
import { DocumentValidator } from '../../../../libs/core/src/common/validator/document.validator';
import { DocumentType } from './document_type';

export class Document {
  private readonly number: string;
  private readonly type: string;

  constructor(numberDocument: string, userType: DocumentType) {
    this.number = numberDocument;
    this.type = userType;
    Object.freeze(this);
  }

  static create(
    value: string,
    documentType: DocumentType,
    documentValidators: DocumentValidator[],
  ): Result<Document> {
    const validator = documentValidators.find(
      (validator) => validator.documentType == documentType,
    );
    if (!validator) {
      throw new BadRequestException(
        'Não foi possível válidar o documento informado',
      );
    }
    return validator.validate(value);
  }

  get getValue(): string {
    return this.number;
  }

  get getType(): string {
    return this.type;
  }
}

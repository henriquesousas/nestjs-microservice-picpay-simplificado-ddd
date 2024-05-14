import { Result } from '../../../../../src/@shared/types/types';
import { DocumentValidator } from '../../../../../libs/core/src/common/validator/document.validator';
import { Document } from '../../../../../src/user/domain/models/document';
import { DocumentType } from '../../../../../src/customer/domain/enum/DocumentType';

export class ValidatorStub extends DocumentValidator {
  documentType: DocumentType;
  constructor(documentType: DocumentType) {
    super();
    this.documentType = documentType;
  }
  validate(data: string): Result<Document> {
    return new Document(data, this.documentType);
  }
}

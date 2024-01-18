import { Result } from '../../../../../libs/core/src/common/types/types';
import { DocumentValidator } from '../../../../../libs/core/src/feature/user/document.validator';
import { Document } from '../../../../../libs/core/src/feature/user/entities/document';
import { DocumentType } from '../../../../../libs/core/src/feature/user/entities/document_type';

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

import { Result } from '@app/core/common/types/types';
import { Document } from '@app/core/feature/user/models/document';
import { DocumentType } from '@app/core/feature/user/models/document_type';
import { DocumentValidator } from '@app/core/common/validator/document.validator';

export class CNPJValidator extends DocumentValidator {
  documentType = DocumentType.CNPJ;
  validate(cnpj: string): Result<Document> {
    return new Document(cnpj, DocumentType.CNPJ);
  }
}

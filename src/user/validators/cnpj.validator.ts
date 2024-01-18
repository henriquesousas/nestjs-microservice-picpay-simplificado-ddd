import { Result } from '@app/core/common/types/types';
import { Document } from '@app/core/feature/user/entities/document';
import { DocumentType } from '@app/core/feature/user/entities/document_type';
import { DocumentValidator } from '@app/core/feature/user/document.validator';

export class CNPJValidator extends DocumentValidator {
  documentType = DocumentType.CNPJ;
  validate(cnpj: string): Result<Document> {
    return new Document(cnpj, DocumentType.CNPJ);
  }
}

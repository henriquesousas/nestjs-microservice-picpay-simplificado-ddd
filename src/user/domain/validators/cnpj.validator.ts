import { Result } from '@app/core/common/types/types';
import { DocumentValidator } from '@app/core/common/validator/document.validator';
import { Document } from '../models/document';
import { DocumentType } from '../models/document_type';

export class CNPJValidator extends DocumentValidator {
  documentType = DocumentType.CNPJ;
  validate(cnpj: string): Result<Document> {
    return new Document(cnpj, DocumentType.CNPJ);
  }
}

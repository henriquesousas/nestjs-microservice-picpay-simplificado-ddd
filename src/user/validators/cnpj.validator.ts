import { Result } from '../../../libs/core/src/common/types/types';
import { Document } from '../../../libs/core/src/feature/user/entities/document';
import { DocumentType } from '../../../libs/core/src/feature/user/entities/document_type';
import { DocumentValidator } from '../../../libs/core/src/feature/user/document.validator';

export class CNPJValidator extends DocumentValidator {
  documentType = DocumentType.CNPJ;
  validate(cnpj: string): Result<Document> {
    return new Document(cnpj, DocumentType.CNPJ);
  }
}

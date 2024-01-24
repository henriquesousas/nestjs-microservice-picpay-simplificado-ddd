import { DocumentInvalidException } from '../../../../libs/core/src/feature/user/exceptions/document-invalid.exception';
import { Document } from '../../../../libs/core/src/feature/user/models/document';
import { DocumentType } from '../../../../libs/core/src/feature/user/models/document_type';
import { CPFValidator } from '../../../../src/user/validators/cpf.validator';

describe('CPFValidator', () => {
  it('should return Document (CPF) if valid cpf', () => {
    const sut = new CPFValidator();
    const document = sut.validate('87687627040') as Document;
    expect(document.getType).toEqual(DocumentType.CPF);
  });

  it('should return DocumentInvalidException if invalid cpf', () => {
    const sut = new CPFValidator();
    const document = sut.validate('123');
    expect(document).toBeInstanceOf(DocumentInvalidException);
  });
});

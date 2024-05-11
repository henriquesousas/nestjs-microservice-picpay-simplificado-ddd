import { Document } from '../../../../src/user/domain/models/document';
import { DocumentType } from '../../../../src/customer/domain/enum/DocumentType';
import { DocumentInvalidException } from '../../../../src/user/domain/exceptions/document-invalid.exception';
import { CPFValidator } from '../../../../src/user/domain/validators/cpf.validator';

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

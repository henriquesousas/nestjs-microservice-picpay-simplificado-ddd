import { Document } from '../../../../libs/core/src/feature/user/models/document';
import { DocumentType } from '../../../../libs/core/src/feature/user/models/document_type';
import { CNPJValidator } from '../../../../src/user/validators/cnpj.validator';

describe('CNPJValidator', () => {
  it('should return Document (CNPJ) if valid cnpj', () => {
    const sut = new CNPJValidator();
    const document = sut.validate('123456') as Document;
    expect(document.getType).toEqual(DocumentType.CNPJ);
  });
});
